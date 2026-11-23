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
          deployment(id: "1e720eb0-6258-4d24-be1a-dc8db45991be") {
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
