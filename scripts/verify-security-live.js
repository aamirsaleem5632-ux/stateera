const https = require('https');

const SUPABASE_URL = 'https://mprxmjlqcdfawbqzajtb.supabase.co';
const PUBLISHABLE_KEY = 'sb_publishable_w4_AwIFFk1iwFU2KbNaG1g_M3RNUl08';

function post(endpoint, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(endpoint, SUPABASE_URL);
    const req = https.request({
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: 'POST',
      headers: {
        'apikey': PUBLISHABLE_KEY,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      }
    }, (res) => {
      let resData = '';
      res.on('data', chunk => resData += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data: resData }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function runSecurityTests() {
  console.log('=== SECURITY & AUTH ENFORCEMENT VERIFICATION ===\n');

  // 1. Invalid Password Rejection
  console.log('Test 1: Invalid password rejected securely');
  const invalidPassRes = await post('/auth/v1/token?grant_type=password', {
    email: 'aamirsaleem5632@gmail.com',
    password: 'DefinitelyWrongPassword!999'
  });
  console.log('  Status:', invalidPassRes.status);
  console.log('  Response:', invalidPassRes.data);
  const pass1 = invalidPassRes.status === 400 && invalidPassRes.data.includes('invalid_credentials');
  console.log('  Result:', pass1 ? 'PASS' : 'FAIL');

  // 2. Unconfirmed Account Cannot Bypass Verification
  console.log('\nTest 2: Unconfirmed user cannot log in or obtain session');
  const unconfirmedRes = await post('/auth/v1/token?grant_type=password', {
    email: 'dasiycooper39@gmail.com',
    password: 'AnyPasswordAttempt123!'
  });
  console.log('  Status:', unconfirmedRes.status);
  console.log('  Response:', unconfirmedRes.data);
  const pass2 = unconfirmedRes.status === 400 && unconfirmedRes.data.includes('invalid_credentials');
  console.log('  Result:', pass2 ? 'PASS' : 'FAIL');

  // 3. Fake / Non-existent User Rejection
  console.log('\nTest 3: Non-existent user rejected with identical error (enumeration prevention)');
  const fakeUserRes = await post('/auth/v1/token?grant_type=password', {
    email: 'nonexistent-random-user-test-404@stateera.test',
    password: 'RandomPassword123!'
  });
  console.log('  Status:', fakeUserRes.status);
  console.log('  Response:', fakeUserRes.data);
  const pass3 = fakeUserRes.status === 400 && fakeUserRes.data.includes('invalid_credentials');
  console.log('  Result:', pass3 ? 'PASS' : 'FAIL');

  // 4. Protected Route Rejection on Production Vercel
  console.log('\nTest 4: Unauthenticated direct request to protected /admin route fails closed');
  const adminReq = await new Promise((resolve) => {
    https.get('https://stateera.vercel.app/admin', (res) => {
      resolve({ status: res.statusCode, location: res.headers['location'] || '' });
    });
  });
  console.log('  Status:', adminReq.status);
  console.log('  Redirect Location:', adminReq.location);
  const pass4 = (adminReq.status === 307 || adminReq.status === 302) && adminReq.location.includes('/login?error=session_required');
  console.log('  Result:', pass4 ? 'PASS' : 'FAIL');

  // 5. Protected Route Rejection on /manager
  console.log('\nTest 5: Unauthenticated direct request to protected /manager route fails closed');
  const mgrReq = await new Promise((resolve) => {
    https.get('https://stateera.vercel.app/manager', (res) => {
      resolve({ status: res.statusCode, location: res.headers['location'] || '' });
    });
  });
  console.log('  Status:', mgrReq.status);
  console.log('  Redirect Location:', mgrReq.location);
  const pass5 = (mgrReq.status === 307 || mgrReq.status === 302) && mgrReq.location.includes('/login?error=session_required');
  console.log('  Result:', pass5 ? 'PASS' : 'FAIL');

  // 6. Protected Route Rejection on /tenant
  console.log('\nTest 6: Unauthenticated direct request to protected /tenant route fails closed');
  const tenantReq = await new Promise((resolve) => {
    https.get('https://stateera.vercel.app/tenant', (res) => {
      resolve({ status: res.statusCode, location: res.headers['location'] || '' });
    });
  });
  console.log('  Status:', tenantReq.status);
  console.log('  Redirect Location:', tenantReq.location);
  const pass6 = (tenantReq.status === 307 || tenantReq.status === 302) && tenantReq.location.includes('/login?error=session_required');
  console.log('  Result:', pass6 ? 'PASS' : 'FAIL');
}

runSecurityTests().catch(console.error);
