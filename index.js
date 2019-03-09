'use strict';

require('dotenv').load();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountPhoneNumber = process.env.TWILIO_NUMBER;
const port = process.env.APP_PORT;

const app = require('express')();
const bodyParser = require('body-parser');
const client = require('twilio')(accountSid, authToken);
const http = require('http');
const MessagingResponse = require('twilio').twiml.MessagingResponse;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/group01/sms/incoming', (req, res) => {
  console.log(req.body.Body);

  client.messages
    .create({
             body: 'test message from the island',
             from: accountPhoneNumber,
             to: '+14082562523',
           })
    .then(message => console.log(message));

  const twiml = new MessagingResponse();
  twiml.message('twiml');

  res.end(twiml.toString());
});

http.createServer(app).listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
