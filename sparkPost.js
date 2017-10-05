var sp = require('sparkpost');

var SparkPostProvider = function () {
  this.apiKey = require('./config').apiKey.SPARKPOST_API_KEY;
  this.sparkPostAPI = new sp(this.apiKey);
};

SparkPostProvider.prototype.send = function ({from, to, subject, message}) {
  var body = {
    content: {
      from: from,
      subject: subject,
      text: message
    },
    recipients: [
      {address: to}
    ]
  };
  return this.sparkPostAPI.transmissions.send(body);
};

module.exports.SparkPostProvider = SparkPostProvider;