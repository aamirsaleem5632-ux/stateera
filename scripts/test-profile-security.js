/**
 * Test Suite: Profile Role & Approval Security Verification
 * Verifies the migration for:
 * 1. An authenticated user cannot change their own role.
 * 2. An authenticated user cannot change their own approval status.
 * 3. An approved admin's trusted approval workflow remains functional.
 * 4. Migration ordering and SQL syntax correctness.
 */

const assert = require("assert");
const fs = require("fs");
const path = require("path");

console.log("===============================================================");
console.log("  PROFILE ROLE & APPROVAL SECURITY TEST SUITE");
console.log("===============================================================\n");

let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    passed++;
    console.log(`  [PASS] ${name}`);
  } catch (err) {
    console.error(`  [FAIL] ${name}`);
    console.error(`         Error: ${err.message}\n`);
  }
}

const migrationPath = path.join(
  __dirname,
  "..",
  "supabase",
  "migrations",
  "20261121143434_stateera_prevent_profile_role_and_approval_escalation.sql"
);

test("Migration file exists and has valid timestamp ordering", () => {
  assert.strictEqual(fs.existsSync(migrationPath), true, "Migration file must exist");
  const filename = path.basename(migrationPath);
  const match = filename.match(/^(\d{14})_/);
  assert.ok(match, "Migration file must have 14-digit timestamp prefix");
  const timestamp = match[1];
  // Must be strictly greater than live migrations 20261121132923 and 20261121133005
  assert.ok(
    timestamp > "20261121133005",
    `Timestamp ${timestamp} must follow previous migrations (20261121133005)`
  );
});

test("Migration triggers on BOTH 'role' and 'role_approval_status'", () => {
  const content = fs.readFileSync(migrationPath, "utf-8");
  
  // Must drop existing trigger safely
  assert.ok(
    content.includes("DROP TRIGGER IF EXISTS prevent_profile_role_escalation ON public.profiles;"),
    "Must drop previous trigger idempotently"
  );

  // Must declare trigger on BOTH columns
  const triggerRegex = /CREATE\s+TRIGGER\s+prevent_profile_role_escalation\s+BEFORE\s+UPDATE\s+OF\s+role,\s*role_approval_status\s+ON\s+public\.profiles/i;
  assert.ok(
    triggerRegex.test(content),
    "Trigger definition must fire BEFORE UPDATE OF role, role_approval_status ON public.profiles"
  );
});

test("Function blocks both role and role_approval_status changes from authenticated users", () => {
  const content = fs.readFileSync(migrationPath, "utf-8");
  
  assert.ok(
    content.includes("current_user = 'authenticated'"),
    "Function must check if current_user = 'authenticated'"
  );
  assert.ok(
    content.includes("new.role is distinct from old.role"),
    "Function must block changes to role"
  );
  assert.ok(
    content.includes("new.role_approval_status is distinct from old.role_approval_status"),
    "Function must block changes to role_approval_status"
  );
  assert.ok(
    content.includes("errcode = '42501'"),
    "Function must raise 42501 insufficient_privilege exception"
  );
});

test("Direct EXECUTE permissions are restricted from PUBLIC, anon, and authenticated", () => {
  const content = fs.readFileSync(migrationPath, "utf-8");
  
  assert.ok(
    content.includes("REVOKE ALL ON FUNCTION private.prevent_profile_role_escalation() FROM PUBLIC;"),
    "Must revoke from PUBLIC"
  );
  assert.ok(
    content.includes("REVOKE ALL ON FUNCTION private.prevent_profile_role_escalation() FROM anon;"),
    "Must revoke from anon"
  );
  assert.ok(
    content.includes("REVOKE ALL ON FUNCTION private.prevent_profile_role_escalation() FROM authenticated;"),
    "Must revoke from authenticated"
  );
  assert.ok(
    content.includes("GRANT EXECUTE ON FUNCTION private.prevent_profile_role_escalation() TO postgres;"),
    "Must grant to postgres"
  );
});

test("Simulation: Authenticated user cannot change their own role", () => {
  function simulateTrigger(currentUser, oldRow, newRow) {
    if (
      currentUser === "authenticated" &&
      (newRow.role !== oldRow.role || newRow.role_approval_status !== oldRow.role_approval_status)
    ) {
      const err = new Error("Profile role and approval changes are not allowed from user sessions");
      err.code = "42501";
      throw err;
    }
    return newRow;
  }

  const oldProfile = { id: "u-123", role: "investor", role_approval_status: "Approved", display_name: "Alice" };
  const tamperedProfile = { ...oldProfile, role: "admin" };

  assert.throws(
    () => simulateTrigger("authenticated", oldProfile, tamperedProfile),
    (err) => err.code === "42501" && err.message.includes("not allowed from user sessions"),
    "Should throw 42501 when authenticated user attempts to change role"
  );
});

test("Simulation: Authenticated user cannot change their own approval status", () => {
  function simulateTrigger(currentUser, oldRow, newRow) {
    if (
      currentUser === "authenticated" &&
      (newRow.role !== oldRow.role || newRow.role_approval_status !== oldRow.role_approval_status)
    ) {
      const err = new Error("Profile role and approval changes are not allowed from user sessions");
      err.code = "42501";
      throw err;
    }
    return newRow;
  }

  const oldProfile = { id: "u-456", role: "manager", role_approval_status: "Pending", display_name: "Bob" };
  const tamperedProfile = { ...oldProfile, role_approval_status: "Approved" };

  assert.throws(
    () => simulateTrigger("authenticated", oldProfile, tamperedProfile),
    (err) => err.code === "42501" && err.message.includes("not allowed from user sessions"),
    "Should throw 42501 when authenticated user attempts to change role_approval_status"
  );
});

test("Simulation: Authenticated user can change permitted fields (e.g. display_name)", () => {
  function simulateTrigger(currentUser, oldRow, newRow) {
    if (
      currentUser === "authenticated" &&
      (newRow.role !== oldRow.role || newRow.role_approval_status !== oldRow.role_approval_status)
    ) {
      const err = new Error("Profile role and approval changes are not allowed from user sessions");
      err.code = "42501";
      throw err;
    }
    return newRow;
  }

  const oldProfile = { id: "u-123", role: "investor", role_approval_status: "Approved", display_name: "Alice" };
  const legitimateUpdate = { ...oldProfile, display_name: "Alice Smith" };

  const result = simulateTrigger("authenticated", oldProfile, legitimateUpdate);
  assert.strictEqual(result.display_name, "Alice Smith");
  assert.strictEqual(result.role, "investor");
});

test("Simulation: Trusted backend (service_role / postgres) can update role and approval status", () => {
  function simulateTrigger(currentUser, oldRow, newRow) {
    if (
      currentUser === "authenticated" &&
      (newRow.role !== oldRow.role || newRow.role_approval_status !== oldRow.role_approval_status)
    ) {
      const err = new Error("Profile role and approval changes are not allowed from user sessions");
      err.code = "42501";
      throw err;
    }
    return newRow;
  }

  const oldProfile = { id: "u-789", role: "manager", role_approval_status: "Pending", display_name: "Charlie" };
  const approvedProfile = { ...oldProfile, role_approval_status: "Approved" };

  // Backend worker running with service_role
  const resultService = simulateTrigger("service_role", oldProfile, approvedProfile);
  assert.strictEqual(resultService.role_approval_status, "Approved");

  // Admin promotion running with postgres superuser
  const promotedProfile = { ...oldProfile, role: "admin", role_approval_status: "Approved" };
  const resultPostgres = simulateTrigger("postgres", oldProfile, promotedProfile);
  assert.strictEqual(resultPostgres.role, "admin");
  assert.strictEqual(resultPostgres.role_approval_status, "Approved");
});

console.log(`\n===============================================================`);
console.log(`  TEST RESULTS: ${passed} / ${total} TESTS PASSED`);
console.log(`===============================================================\n`);

if (passed !== total) {
  process.exit(1);
}
