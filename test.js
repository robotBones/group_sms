const clockwork = require('clockwork')({key:'ab6b083fe9a8d60fd2e8ab0151b53b10380c13a9'});

const carrie = '17605678926';
const kim = '15733688224';
const me = '14082562523';
const me2 = '18584498040';

clockwork.sendSms({
  To: me2,
  From: carrie,
  Content: 'Test!',
}, (error, resp) => {
  if (error) {
    console.log('Something went wrong', error);
  } else {
    console.log('Message sent to',resp.responses[0].to);
    console.log('Message was',resp.responses[0]);
  }
});
