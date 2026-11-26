const https = require('https');

async function get(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, text: data }));
    }).on('error', reject);
  });
}

async function verifyDeployment() {
  console.log('--- 1. VERIFY VERCEL PRODUCTION DEPLOYMENT ---');
  const loginRes = await get('https://stateera.vercel.app/login');
  console.log('GET https://stateera.vercel.app/login -> Status:', loginRes.status);
  
  const hasResendText = loginRes.text.includes('Resend verification?');
  console.log('Production HTML contains "Resend verification?":', hasResendText);

  // Check chunks for the new commit features
  const scriptRegex = /src="(\/_next\/[^"]+\.js)"/g;
  let match;
  let foundFeature = false;
  while ((match = scriptRegex.exec(loginRes.text)) !== null) {
    const scriptUrl = 'https://stateera.vercel.app' + match[1];
    const scriptRes = await get(scriptUrl);
    if (scriptRes.text.includes('Resend Verification Link')) {
      console.log('Found "Resend Verification Link" in production JS:', match[1]);
      foundFeature = true;
    }
    if (scriptRes.text.includes('email_link_expired')) {
      console.log('Found "email_link_expired" handler in production JS:', match[1]);
    }
  }

  // Check callback route behavior on error
  console.log('\n--- 2. VERIFY /auth/callback ELIMINATION OF FALSE POSITIVES ---');
  // Pass an expired otp error to callback
  const callbackRes = await get('https://stateera.vercel.app/auth/callback?error=access_denied&error_code=otp_expired&error_description=Email+link+is+invalid+or+has+expired');
  console.log('GET /auth/callback with otp_expired -> Status:', callbackRes.status);
  const location = callbackRes.headers['location'] || '';
  console.log('Redirect Location:', location);
  const falsePositiveGone = !location.includes('message=email_confirmed');
  const correctErrorSet = location.includes('error=email_link_expired');
  console.log('Does NOT set message=email_confirmed (PASS):', falsePositiveGone);
  console.log('Correctly sets error=email_link_expired (PASS):', correctErrorSet);
}

verifyDeployment().catch(console.error);
