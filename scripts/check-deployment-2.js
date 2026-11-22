const fs = require('fs');
const os = require('os');

const p = os.homedir() + '/.railway/config.json';
const c = JSON.parse(fs.readFileSync(p, 'utf8'));
const token = c.user?.accessToken;

async function checkDeployment() {
  const res = await fetch('https://backboard.railway.com/graphql/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `
        query {
          deployment(id: "fa3a115f-9cd7-4c7e-90be-a7915ef6aadc") {
            id
            status
            createdAt
            updatedAt
          }
        }
      `
    })
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

checkDeployment().catch(console.error);
