const fs = require('fs');
const os = require('os');

const p = os.homedir() + '/.railway/config.json';
const c = JSON.parse(fs.readFileSync(p, 'utf8'));
const token = c.user?.accessToken;

async function createDomain() {
  const res = await fetch('https://backboard.railway.com/graphql/v2', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      query: `
        mutation serviceDomainCreate($input: ServiceDomainCreateInput!) {
          serviceDomainCreate(input: $input) {
            domain
          }
        }
      `,
      variables: {
        input: {
          environmentId: "743b3af8-4a8c-435b-b76d-986488eae9d9",
          serviceId: "ec2eb737-952c-4a14-b83d-ccbdecbeecda"
        }
      }
    })
  });

  const data = await res.json();
  console.log(JSON.stringify(data, null, 2));
}

createDomain().catch(console.error);
