const fs = require('fs');
const os = require('os');

const p = os.homedir() + '/.railway/config.json';
const c = JSON.parse(fs.readFileSync(p, 'utf8'));
const token = c.user?.accessToken;

// Read local env
const envContent = fs.readFileSync('E:/Project/stateera/.env.local', 'utf8');
let supabaseKey = '';
for (const line of envContent.split('\n')) {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=')) {
    supabaseKey = line.split('=')[1].trim();
  }
}

async function setVariables() {
  const variables = {
    projectId: "526c6dad-2387-47e1-85da-41ea3b94371d",
    environmentId: "743b3af8-4a8c-435b-b76d-986488eae9d9",
    serviceId: "ec2eb737-952c-4a14-b83d-ccbdecbeecda",
    variables: {
      NODE_ENV: "production",
      PORT: "4000",
      SUPABASE_URL: "https://mprxmjlqcdfawbqzajtb.supabase.co",
      SUPABASE_ANON_KEY: supabaseKey,
      NEXT_PUBLIC_SUPABASE_URL: "https://mprxmjlqcdfawbqzajtb.supabase.co",
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: supabaseKey,
      FRONTEND_URL: "https://stateera-omni-scribe.vercel.app"
    }
  };

  const res = await fetch('https://backboard.railway.com/graphql/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `
        mutation variableCollectionUpsert($input: VariableCollectionUpsertInput!) {
          variableCollectionUpsert(input: $input)
        }
      `,
      variables: { input: variables }
    })
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

setVariables().catch(console.error);
