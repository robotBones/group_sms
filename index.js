'use strict';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountPhoneNumber = process.env.TWILIO_NUMBER;

const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
         body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
         from: '+15017122661',
         to: accountPhoneNumber,
       })
  .then(message => console.log(message.sid));
