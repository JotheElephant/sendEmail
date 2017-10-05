var config = require('./config').apiKey;
var sp = require('sparkpost');
var client = new sp(config.SPARKPOST_API_KEY);

var sparkPostProvider = function ({from, to, subject, message}) {
  return client.transmissions.send({
    content: {
      from: from,
      subject: subject,
      text: message
    },
    recipients: [
      {address: to}
    ]
  })
}

module.exports.sparkPostProvider = sparkPostProvider;