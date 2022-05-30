'use strict';
const AWS = require('@aws-sdk/client-sso-admin')
const ListInstancesCommand=AWS.ListInstancesCommand
const SSOAdminClient = AWS.SSOAdminClient
const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

async function test() {
  const accessKeyId = process.env['AWS_ACCESS_KEY_ID'];
  const secretAccessKey = process.env['AWS_SECRET_ACCESS_KEY'];
  const region = process.env['REGION_NAME'];
  console.log({accessKeyId, secretAccessKey, region})

  const params = {
    region: region,
    credentials: {accessKeyId: accessKeyId, secretAccessKey: secretAccessKey},
    logger: {
      info: function (log) {
        console.log('Info----->>>>>>>>>>>>>>>>>>>:', log);
      },
      debug: function (log) {
        console.log('debug:', log);
      },
      warn: function (log) {
        console.log('warn:', log);
      },
      error: function (log) {
        console.log('error:', log);
      },
    },
  };

  const ssoAdminClient = new SSOAdminClient(params);
  const listInstancesCommand = new ListInstancesCommand({
    MaxResults: 100,
  });
  const promise = await ssoAdminClient.send(listInstancesCommand);
  console.log(promise);
}

// App
const app = express();
app.get('/', async(req, res) => {
  await test();
  res.send('Hello World');
});


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
