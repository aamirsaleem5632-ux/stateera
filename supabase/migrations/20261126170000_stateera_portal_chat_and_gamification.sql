-- =========================================================================
-- STATEERA PORTAL CHAT & EDUCATIONAL GAMIFICATION MIGRATION
-- Migration Ref: 20261126170000_stateera_portal_chat_and_gamification.sql
-- Target Project: mprxmjlqcdfawbqzajtb
--
-- Tables Defined:
--   1. public.portal_conversations (tenant <-> manager property threads)
--   2. public.portal_messages (persistent cross-device messages + read receipts)
--   3. public.user_learning_progress (server-authoritative XP & module tracking)
--   4. public.user_learning_badges (awarded educational badges)
--
-- Security:
--   - RLS enabled on all 4 tables
--   - Least-privilege participant/owner policies
--   - Server-side SECURITY DEFINER RPCs for gamification XP/quiz/leaderboard
--   - Zero direct client mutation on user_learning_progress or user_learning_badges
-- =========================================================================

-- -------------------------------------------------------------------------
-- 1. PORTAL CONVERSATIONS & MESSAGES (Cross-Device Tenant <-> Manager Chat)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.portal_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES public.properties(id) ON DELETE CASCADE NOT NULL,
  tenant_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  manager_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  unit_number TEXT NOT NULL DEFAULT 'Unit',
  last_message_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(property_id, tenant_id)
);

CREATE INDEX IF NOT EXISTS idx_portal_conversations_tenant
  ON public.portal_conversations(tenant_id, last_message_at DESC);
CREATE INDEX IF NOT EXISTS idx_portal_conversations_property
  ON public.portal_conversations(property_id, last_message_at DESC);

ALTER TABLE public.portal_conversations ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.portal_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.portal_conversations(id) ON DELETE CASCADE NOT NULL,
  sender_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  sender_role TEXT NOT NULL CHECK (sender_role IN ('tenant', 'manager', 'admin')),
  sender_name TEXT NOT NULL DEFAULT 'Participant',
  content TEXT NOT NULL CHECK (char_length(trim(content)) BETWEEN 1 AND 2000),
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_portal_messages_conv_created
  ON public.portal_messages(conversation_id, created_at ASC);

ALTER TABLE public.portal_messages ENABLE ROW LEVEL SECURITY;

-- Helper: Check if current authenticated user is an authorized participant of a conversation
CREATE OR REPLACE FUNCTION public.is_conversation_participant(p_conversation_id uuid)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.portal_conversations c
    WHERE c.id = p_conversation_id
      AND (
        c.tenant_id = auth.uid()
        OR c.manager_id = auth.uid()
        OR public.is_assigned_manager(c.property_id)
        OR public.is_approved_admin()
      )
  );
$$;

REVOKE ALL ON FUNCTION public.is_conversation_participant(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.is_conversation_participant(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.is_conversation_participant(uuid) TO authenticated;

-- RLS Policies for portal_conversations
DROP POLICY IF EXISTS "Participants view portal conversations" ON public.portal_conversations;
CREATE POLICY "Participants view portal conversations"
ON public.portal_conversations FOR SELECT
TO authenticated
USING (
  tenant_id = auth.uid()
  OR manager_id = auth.uid()
  OR public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

DROP POLICY IF EXISTS "Authorized tenants or managers create conversations" ON public.portal_conversations;
CREATE POLICY "Authorized tenants or managers create conversations"
ON public.portal_conversations FOR INSERT
TO authenticated
WITH CHECK (
  (
    tenant_id = auth.uid()
    AND EXISTS (
      SELECT 1 FROM public.leases l
      WHERE l.property_id = portal_conversations.property_id
        AND l.tenant_id = auth.uid()
        AND l.status = 'Active'
    )
  )
  OR public.is_assigned_manager(property_id)
  OR public.is_approved_admin()
);

-- RLS Policies for portal_messages
DROP POLICY IF EXISTS "Participants view portal messages" ON public.portal_messages;
CREATE POLICY "Participants view portal messages"
ON public.portal_messages FOR SELECT
TO authenticated
USING (public.is_conversation_participant(conversation_id));

DROP POLICY IF EXISTS "Participants send portal messages without impersonation" ON public.portal_messages;
CREATE POLICY "Participants send portal messages without impersonation"
ON public.portal_messages FOR INSERT
TO authenticated
WITH CHECK (
  sender_id = auth.uid()
  AND public.is_conversation_participant(conversation_id)
  AND EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = auth.uid()
      AND p.role = portal_messages.sender_role
      AND (
        p.role = 'tenant'
        OR p.role_approval_status = 'Approved'
      )
  )
);

DROP POLICY IF EXISTS "Recipients mark portal messages as read" ON public.portal_messages;
CREATE POLICY "Recipients mark portal messages as read"
ON public.portal_messages FOR UPDATE
TO authenticated
USING (
  public.is_conversation_participant(conversation_id)
  AND sender_id <> auth.uid()
)
WITH CHECK (
  public.is_conversation_participant(conversation_id)
  AND sender_id <> auth.uid()
);

-- Trigger: Update conversation last_message_at & enforce per-user rate limit (max 20 msgs / minute)
CREATE OR REPLACE FUNCTION public.handle_portal_message_insert()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_recent_count INT;
BEGIN
  SELECT COUNT(*) INTO v_recent_count
  FROM public.portal_messages
  WHERE sender_id = NEW.sender_id
    AND created_at > (timezone('utc'::text, now()) - INTERVAL '1 minute');

  IF v_recent_count >= 20 THEN
    RAISE EXCEPTION 'Message rate limit exceeded. Please wait before sending more messages.';
  END IF;

  UPDATE public.portal_conversations
  SET last_message_at = NEW.created_at
  WHERE id = NEW.conversation_id;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_portal_message_insert ON public.portal_messages;
CREATE TRIGGER trg_portal_message_insert
  BEFORE INSERT ON public.portal_messages
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_portal_message_insert();

-- Enable Supabase Realtime on portal_messages safely
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_publication WHERE pubname = 'supabase_realtime') THEN
    IF NOT EXISTS (
      SELECT 1
      FROM pg_publication_tables
      WHERE pubname = 'supabase_realtime'
        AND schemaname = 'public'
        AND tablename = 'portal_messages'
    ) THEN
      ALTER PUBLICATION supabase_realtime ADD TABLE public.portal_messages;
    END IF;
  END IF;
END;
$$;

-- -------------------------------------------------------------------------
-- 2. EDUCATIONAL GAMIFICATION (XP, Badges & Privacy-Safe Leaderboard)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_learning_progress (
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT NOT NULL DEFAULT 'StateEra Learner',
  completed_modules TEXT[] NOT NULL DEFAULT '{}',
  quiz_passed BOOLEAN NOT NULL DEFAULT false,
  best_quiz_score INT NOT NULL DEFAULT 0 CHECK (best_quiz_score BETWEEN 0 AND 3),
  xp_points INT NOT NULL DEFAULT 0 CHECK (xp_points >= 0 AND xp_points <= 200),
  badges_count INT NOT NULL DEFAULT 0 CHECK (badges_count >= 0 AND badges_count <= 4),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.user_learning_progress ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS public.user_learning_badges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  badge_id TEXT NOT NULL CHECK (badge_id IN ('first-principles', 'dd-scholar', 'academy-grad', 'quiz-master')),
  earned_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  UNIQUE(user_id, badge_id)
);

ALTER TABLE public.user_learning_badges ENABLE ROW LEVEL SECURITY;

-- RLS: Users can ONLY read their own progress/badges; NO direct client INSERT/UPDATE/DELETE
DROP POLICY IF EXISTS "Users view own learning progress" ON public.user_learning_progress;
CREATE POLICY "Users view own learning progress"
ON public.user_learning_progress FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.is_approved_admin());

DROP POLICY IF EXISTS "Users view own learning badges" ON public.user_learning_badges;
CREATE POLICY "Users view own learning badges"
ON public.user_learning_badges FOR SELECT
TO authenticated
USING (auth.uid() = user_id OR public.is_approved_admin());

-- Helper: Privacy-safe display name from profiles (First name + Last initial, never email)
-- Uses profiles.display_name — the authoritative name column per migration 20261123234500.
CREATE OR REPLACE FUNCTION public.format_public_learner_name(p_user_id uuid)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT COALESCE(
    NULLIF(
      CASE
        WHEN display_name IS NULL OR btrim(display_name) = '' THEN NULL
        WHEN position(' ' IN btrim(display_name)) > 0 THEN
          split_part(btrim(display_name), ' ', 1) || ' ' || left(split_part(btrim(display_name), ' ', 2), 1) || '.'
        ELSE
          left(btrim(display_name), 16)
      END,
      ''
    ),
    'Learner #' || upper(left(replace(p_user_id::text, '-', ''), 4))
  )
  FROM public.profiles
  WHERE id = p_user_id;
$$;

-- Helper: Recalculate XP & award eligible badges deterministically server-side
CREATE OR REPLACE FUNCTION public.recalculate_learning_rewards(p_user_id uuid)
RETURNS public.user_learning_progress
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_row public.user_learning_progress;
  v_mod_count INT;
  v_xp INT;
  v_badges_count INT;
BEGIN
  SELECT * INTO v_row
  FROM public.user_learning_progress
  WHERE user_id = p_user_id
  FOR UPDATE;

  IF NOT FOUND THEN
    RAISE EXCEPTION 'Learning progress record not found for user.';
  END IF;

  v_mod_count := COALESCE(array_length(v_row.completed_modules, 1), 0);
  v_xp := (v_mod_count * 25) + (CASE WHEN v_row.quiz_passed THEN 50 ELSE 0 END);

  IF v_mod_count >= 1 THEN
    INSERT INTO public.user_learning_badges (user_id, badge_id)
    VALUES (p_user_id, 'first-principles')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  IF v_mod_count >= 3 THEN
    INSERT INTO public.user_learning_badges (user_id, badge_id)
    VALUES (p_user_id, 'dd-scholar')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  IF v_mod_count >= 6 THEN
    INSERT INTO public.user_learning_badges (user_id, badge_id)
    VALUES (p_user_id, 'academy-grad')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  IF v_row.best_quiz_score >= 3 THEN
    INSERT INTO public.user_learning_badges (user_id, badge_id)
    VALUES (p_user_id, 'quiz-master')
    ON CONFLICT (user_id, badge_id) DO NOTHING;
  END IF;

  SELECT COUNT(*) INTO v_badges_count
  FROM public.user_learning_badges
  WHERE user_id = p_user_id;

  UPDATE public.user_learning_progress
  SET xp_points = v_xp,
      badges_count = v_badges_count,
      display_name = COALESCE(public.format_public_learner_name(p_user_id), display_name),
      updated_at = timezone('utc'::text, now())
  WHERE user_id = p_user_id
  RETURNING * INTO v_row;

  RETURN v_row;
END;
$$;

-- RPC: Complete a verified curriculum module (idempotent, no duplicate XP)
CREATE OR REPLACE FUNCTION public.complete_learning_module(p_module_id text)
RETURNS public.user_learning_progress
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_display TEXT;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to record learning progress.';
  END IF;

  IF p_module_id NOT IN ('mod-1', 'mod-2', 'mod-3', 'mod-4', 'mod-5', 'mod-6') THEN
    RAISE EXCEPTION 'Invalid learning module identifier.';
  END IF;

  v_display := COALESCE(public.format_public_learner_name(v_user_id), 'StateEra Learner');

  INSERT INTO public.user_learning_progress (user_id, display_name, completed_modules)
  VALUES (v_user_id, v_display, ARRAY[p_module_id])
  ON CONFLICT (user_id) DO UPDATE
  SET completed_modules = CASE
        WHEN p_module_id = ANY(public.user_learning_progress.completed_modules)
          THEN public.user_learning_progress.completed_modules
        ELSE array_append(public.user_learning_progress.completed_modules, p_module_id)
      END,
      updated_at = timezone('utc'::text, now());

  RETURN public.recalculate_learning_rewards(v_user_id);
END;
$$;

-- RPC: Submit quiz answers (server-side answer key grading, prevents unlimited XP)
CREATE OR REPLACE FUNCTION public.submit_learning_quiz(p_answers int[])
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_user_id UUID := auth.uid();
  v_answer_key INT[] := ARRAY[1, 1, 2];
  v_score INT := 0;
  v_passed BOOLEAN;
  v_display TEXT;
  v_row public.user_learning_progress;
BEGIN
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Authentication required to submit quiz.';
  END IF;

  IF p_answers IS NULL OR array_length(p_answers, 1) <> 3 THEN
    RAISE EXCEPTION 'Quiz submission must include exactly 3 answers.';
  END IF;

  FOR i IN 1..3 LOOP
    IF p_answers[i] = v_answer_key[i] THEN
      v_score := v_score + 1;
    END IF;
  END LOOP;

  v_passed := (v_score >= 2);
  v_display := COALESCE(public.format_public_learner_name(v_user_id), 'StateEra Learner');

  INSERT INTO public.user_learning_progress (user_id, display_name, quiz_passed, best_quiz_score)
  VALUES (v_user_id, v_display, v_passed, v_score)
  ON CONFLICT (user_id) DO UPDATE
  SET quiz_passed = public.user_learning_progress.quiz_passed OR v_passed,
      best_quiz_score = GREATEST(public.user_learning_progress.best_quiz_score, v_score),
      updated_at = timezone('utc'::text, now());

  v_row := public.recalculate_learning_rewards(v_user_id);

  RETURN jsonb_build_object(
    'score', v_score,
    'passed', v_passed,
    'progress', row_to_json(v_row)
  );
END;
$$;

-- RPC: Privacy-safe real database leaderboard (no emails or raw user_ids exposed)
CREATE OR REPLACE FUNCTION public.get_learning_leaderboard(p_limit int DEFAULT 10)
RETURNS TABLE (
  rank_position BIGINT,
  display_name TEXT,
  xp_points INT,
  badges_count INT,
  is_current_user BOOLEAN
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT
    ROW_NUMBER() OVER (ORDER BY ulp.xp_points DESC, ulp.badges_count DESC, ulp.updated_at ASC) AS rank_position,
    ulp.display_name,
    ulp.xp_points,
    ulp.badges_count,
    (ulp.user_id = auth.uid()) AS is_current_user
  FROM public.user_learning_progress ulp
  WHERE ulp.xp_points > 0
  ORDER BY ulp.xp_points DESC, ulp.badges_count DESC, ulp.updated_at ASC
  LIMIT LEAST(GREATEST(COALESCE(p_limit, 10), 1), 25);
$$;

REVOKE ALL ON FUNCTION public.format_public_learner_name(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.recalculate_learning_rewards(uuid) FROM PUBLIC;

REVOKE ALL ON FUNCTION public.complete_learning_module(text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.complete_learning_module(text) FROM anon;
GRANT EXECUTE ON FUNCTION public.complete_learning_module(text) TO authenticated;

REVOKE ALL ON FUNCTION public.submit_learning_quiz(int[]) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.submit_learning_quiz(int[]) FROM anon;
GRANT EXECUTE ON FUNCTION public.submit_learning_quiz(int[]) TO authenticated;

REVOKE ALL ON FUNCTION public.get_learning_leaderboard(int) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_learning_leaderboard(int) TO anon, authenticated;
