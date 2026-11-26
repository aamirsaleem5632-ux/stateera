const https = require('https');

const SUPABASE_HOST = 'mprxmjlqcdfawbqzajtb.supabase.co';
const PUBLISHABLE_KEY = 'sb_publishable_w4_AwIFFk1iwFU2KbNaG1g_M3RNUl08';

function request(method, path, body = null, token = null) {
  return new Promise((resolve) => {
    const data = body ? JSON.stringify(body) : null;
    const headers = {
      'apikey': PUBLISHABLE_KEY,
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    if (data) {
      headers['Content-Type'] = 'application/json';
      headers['Content-Length'] = Buffer.byteLength(data);
    }
    const req = https.request({
      hostname: SUPABASE_HOST,
      path: path,
      method: method,
      headers: headers,
    }, res => {
      let d = '';
      res.on('data', c => d += c);
      res.on('end', () => {
        let json = null;
        try { json = JSON.parse(d); } catch {}
        resolve({ status: res.statusCode, headers: res.headers, data: json, raw: d });
      });
    });
    req.on('error', err => resolve({ status: 500, error: err.message }));
    if (data) req.write(data);
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function runMultiAccountTests() {
  console.log('===============================================================');
  console.log('  STATEERA LIVE 5-ACCOUNT AUTHENTICATION & SECURITY TEST SUITE');
  console.log('===============================================================\n');

  const testAccounts = [
    { id: 'Test 1', email: 'stateera.tester.alpha@gmail.com', name: 'Alpha Tester' },
    { id: 'Test 2', email: 'stateera.tester.beta@gmail.com', name: 'Beta Tester' },
    { id: 'Test 3', email: 'stateera.tester.gamma@gmail.com', name: 'Gamma Tester' },
    { id: 'Test 4', email: 'stateera.tester.delta@gmail.com', name: 'Delta Tester' },
    { id: 'Test 5', email: 'stateera.tester.omega@gmail.com', name: 'Omega Tester' },
  ];

  const results = [];

  for (const acc of testAccounts) {
    console.log(`\n--- Testing Account: ${acc.id} (${acc.email}) ---`);
    const record = {
      account: acc.id,
      email: acc.email,
      signup: 'NOT TESTED',
      emailDelivered: 'NOT TESTED',
      verified: 'NOT TESTED',
      unverifiedLoginRejection: 'NOT TESTED',
      wrongPasswordRejection: 'NOT TESTED',
      resendVerification: 'NOT TESTED',
      forgotPassword: 'NOT TESTED',
      notes: ''
    };

    // 1. Signup attempt
    const signupRes = await request('POST', '/auth/v1/signup', {
      email: acc.email,
      password: 'StrongPassword123!',
      data: { full_name: acc.name, role: 'investor' }
    });

    console.log(`  Signup status: ${signupRes.status}`);
    if (signupRes.status === 200) {
      record.signup = 'VERIFIED PASS';
      console.log(`  [PASS] User created with ID: ${signupRes.data?.id}`);
      console.log(`  Confirmation Sent At: ${signupRes.data?.confirmation_sent_at}`);
      record.emailDelivered = 'BLOCKED — INBOX ACCESS REQUIRED';
      record.verified = 'BLOCKED — INBOX ACCESS REQUIRED';
    } else if (signupRes.status === 400 && signupRes.raw.includes('already registered')) {
      record.signup = 'VERIFIED PASS (Pre-existing account)';
      console.log(`  [PASS] Account already registered in Supabase`);
    } else if (signupRes.status === 429) {
      record.signup = 'FAILED (Rate Limited by Supabase free mailer)';
      console.log(`  [WARN] Rate limited: ${signupRes.raw}`);
    } else {
      record.signup = `FAILED (Status ${signupRes.status}: ${signupRes.raw})`;
    }

    // 2. Unverified login attempt (must fail with email_not_confirmed)
    const loginAttempt = await request('POST', '/auth/v1/token?grant_type=password', {
      email: acc.email,
      password: 'StrongPassword123!'
    });
    console.log(`  Unverified Login Status: ${loginAttempt.status}`);
    if (loginAttempt.status === 400 && loginAttempt.raw.includes('email_not_confirmed')) {
      record.unverifiedLoginRejection = 'VERIFIED PASS (Rejected with email_not_confirmed)';
      console.log(`  [PASS] Unverified user correctly blocked from login`);
    } else if (loginAttempt.status === 200) {
      record.unverifiedLoginRejection = 'USER ALREADY CONFIRMED (Session created)';
      record.verified = 'VERIFIED PASS';
    } else {
      record.unverifiedLoginRejection = `Result: Status ${loginAttempt.status} (${loginAttempt.raw})`;
    }

    // 3. Wrong password rejection
    const wrongPassAttempt = await request('POST', '/auth/v1/token?grant_type=password', {
      email: acc.email,
      password: 'WrongPassword999!'
    });
    if (wrongPassAttempt.status === 400) {
      record.wrongPasswordRejection = 'VERIFIED PASS (Securely rejected)';
      console.log(`  [PASS] Wrong password securely rejected`);
    }

    // 4. Password Recovery / Forgot Password dispatch
    const recoveryRes = await request('POST', '/auth/v1/recover', {
      email: acc.email
    });
    console.log(`  Recovery Request Status: ${recoveryRes.status}`);
    if (recoveryRes.status === 200) {
      record.forgotPassword = 'VERIFIED PASS (Recovery token dispatched)';
      console.log(`  [PASS] Password recovery dispatched`);
    } else if (recoveryRes.status === 429) {
      record.forgotPassword = 'BLOCKED — SMTP RATE LIMITED (Supabase built-in mailer limit)';
      console.log(`  [WARN] Recovery rate limited: ${recoveryRes.raw}`);
    } else {
      record.forgotPassword = `Status ${recoveryRes.status}: ${recoveryRes.raw}`;
    }

    results.push(record);
    // Pause between accounts to avoid hitting IP abuse filters
    await sleep(2000);
  }

  console.log('\n===============================================================');
  console.log('  LIVE TESTING RESULTS MATRIX');
  console.log('===============================================================');
  console.table(results);
}

runMultiAccountTests().catch(console.error);
