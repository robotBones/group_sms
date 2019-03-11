'use strict';

require('dotenv').load();

const persons = require('./persons');

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

app.post('/sms/incoming', (req, res) => {
  const phoneNumber = req.body.From;
  const sms = req.body.Body;
  const person = persons.find( {phoneNumber} )[0];

  if (!person) {
    persons.insert({phoneNumber});
    client.messages
      .create({
	     body: 'You\'re new. Before you join, what is your name?',
	     from: accountPhoneNumber,
	     to: phoneNumber,
	   })
      .then(message => console.log(message.body));
  }
  else if (!person.name) {
    person.name = sms;
    client.messages
      .create({
	     body: `Hello, ${sms}!`,
	     from: accountPhoneNumber,
	     to: phoneNumber,
	   })
      .then(message => console.log('new name is:', sms));
  }
  else {
    const broadcast = `${person.name} says ${sms}`;
    persons.find().forEach(person => {
    if (person.phoneNumber === phoneNumber) return;
    client.messages
      .create({
	     body: broadcast,
	     from: accountPhoneNumber,
	     to: person.phoneNumber,
	   })
      .then(message => console.log(`${broadcast} to ${person.phoneNumber}`));
    });
  }

  res.end();
});

http.createServer(app).listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
