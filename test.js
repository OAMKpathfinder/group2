const { spawn } = require('child_process');
const request = require('request');
const test = require('tape');

const env = Object.assign({}, process.env, {PORT: 5000});
const child = spawn('node', ['index.js'], {env});

test('Test #1: Server responds to requests', (t) => {
  child.stdout.on('data', _ => {
    console.log('Server Process Output: '+_.toString());
    request('http://127.0.0.1:5000', (error, response, body) => {
      child.kill();
      t.false(error);
      t.equal(response.statusCode, 200);
    });
  });
  t.end();
});