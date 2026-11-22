const fs = require('fs');
const os = require('os');

const p = os.homedir() + '/.railway/config.json';
const c = JSON.parse(fs.readFileSync(p, 'utf8'));
const token = c.user?.accessToken;

async function check() {
  const res = await fetch('https://backboard.railway.com/graphql/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `
        mutation {
          serviceCreate(input: {
            projectId: "526c6dad-2387-47e1-85da-41ea3b94371d",
            name: "stateera-backend"
          }) {
            id
            name
          }
        }
      `
    })
  });
  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

check().catch(console.error);
