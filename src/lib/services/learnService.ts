import { createClient } from "@/lib/supabase/client";

export interface DbLearnProgress {
  completedModules: string[];
  quizPassed: boolean;
  bestQuizScore: number;
  xpPoints: number;
  badgesCount: number;
  earnedBadges: string[];
}

export interface DbLeaderboardEntry {
  rank: number;
  displayName: string;
  xpPoints: number;
  badgesCount: number;
  isCurrentUser: boolean;
}

export const learnService = {
  async getProgress(): Promise<DbLearnProgress | null> {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return null;

    const [{ data: prog, error: progError }, { data: badges }] = await Promise.all([
      supabase
        .from("user_learning_progress")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle(),
      supabase
        .from("user_learning_badges")
        .select("badge_id")
        .eq("user_id", user.id),
    ]);

    if (progError) {
      throw new Error(progError.message || "Unable to load learning progress.");
    }

    if (!prog) {
      return {
        completedModules: [],
        quizPassed: false,
        bestQuizScore: 0,
        xpPoints: 0,
        badgesCount: 0,
        earnedBadges: [],
      };
    }

    return {
      completedModules: Array.isArray(prog.completed_modules)
        ? prog.completed_modules
        : [],
      quizPassed: Boolean(prog.quiz_passed),
      bestQuizScore: Number(prog.best_quiz_score) || 0,
      xpPoints: Number(prog.xp_points) || 0,
      badgesCount: Number(prog.badges_count) || 0,
      earnedBadges: (badges || []).map((b: { badge_id: string }) => b.badge_id),
    };
  },

  async completeModule(moduleId: string): Promise<DbLearnProgress> {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("complete_learning_module", {
      p_module_id: moduleId,
    });

    if (error || !data) {
      throw new Error(error?.message || "Unable to save module completion.");
    }

    return {
      completedModules: Array.isArray(data.completed_modules)
        ? data.completed_modules
        : [],
      quizPassed: Boolean(data.quiz_passed),
      bestQuizScore: Number(data.best_quiz_score) || 0,
      xpPoints: Number(data.xp_points) || 0,
      badgesCount: Number(data.badges_count) || 0,
      earnedBadges: [],
    };
  },

  async submitQuiz(answers: number[]): Promise<{
    score: number;
    passed: boolean;
    progress: DbLearnProgress;
  }> {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("submit_learning_quiz", {
      p_answers: answers,
    });

    if (error || !data) {
      throw new Error(error?.message || "Unable to grade and save quiz.");
    }

    const p = data.progress || {};
    return {
      score: Number(data.score) || 0,
      passed: Boolean(data.passed),
      progress: {
        completedModules: Array.isArray(p.completed_modules)
          ? p.completed_modules
          : [],
        quizPassed: Boolean(p.quiz_passed),
        bestQuizScore: Number(p.best_quiz_score) || 0,
        xpPoints: Number(p.xp_points) || 0,
        badgesCount: Number(p.badges_count) || 0,
        earnedBadges: [],
      },
    };
  },

  async getLeaderboard(limit = 10): Promise<DbLeaderboardEntry[]> {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("get_learning_leaderboard", {
      p_limit: limit,
    });

    if (error) {
      throw new Error(error.message || "Unable to load leaderboard.");
    }

    return (data || []).map((row: any) => ({
      rank: Number(row.rank_position) || 1,
      displayName: row.display_name || "Learner",
      xpPoints: Number(row.xp_points) || 0,
      badgesCount: Number(row.badges_count) || 0,
      isCurrentUser: Boolean(row.is_current_user),
    }));
  },
};
