'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountPhoneNumber = process.env.TWILIO_NUMBER;
const port = process.env.APP_PORT;

const app = require('express')();
const client = require('twilio')(accountSid, authToken);
const http = require('http');

client.messages
  .create({
           body: 'test message from the island',
           from: '+1234567890',
           to: accountPhoneNumber,
         })
  .then(message => console.log(message.sid));

app.post('/sms', (req, res) => {
  console.log('request: ', req);
  console.log('response: ', res);
});

http.createServer(app).listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
