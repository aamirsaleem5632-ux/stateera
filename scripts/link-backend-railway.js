const fs = require('fs');
const os = require('os');

const p = os.homedir() + '/.railway/config.json';
const c = JSON.parse(fs.readFileSync(p, 'utf8'));

c.projects = c.projects || {};
c.projects['E:\\Project\\stateera\\backend'] = {
  project: '526c6dad-2387-47e1-85da-41ea3b94371d',
  environment: '743b3af8-4a8c-435b-b76d-986488eae9d9',
  service: 'ec2eb737-952c-4a14-b83d-ccbdecbeecda',
  name: 'modest-reprieve',
  environmentName: 'production',
  projectPath: 'E:\\Project\\stateera\\backend'
};

fs.writeFileSync(p, JSON.stringify(c, null, 2), 'utf8');
console.log('Railway config linked for stateera/backend successfully!');
