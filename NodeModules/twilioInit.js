var config = {
  accountSid: 'ACaa724f7908e288fd3ad4ce1688ffd843',
  authToken: '6408fdada27799d4eee18d1567866b69'
}
var client = require('twilio')(config.accountSid, config.authToken);

// Function Sends SMS to Client
exports.sendSMS = function(_to, _from, _message) {
  client.messages.create({
    body: _message,
    to: _to,
    from: _from
    // mediaUrl: 'http://www.yourserver.com/someimage.png'
  }, function(err, data) {
    // Message Failed
    if (err) {
      console.error('Could not send Message');
      console.error(err);
    // Success
    } else {
      console.log('Message Sent');
    }
  });
};
