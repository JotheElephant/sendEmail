var config = require('./config').apiKey;
var SparkPost = require('sparkpost');
var client = new SparkPost(config.SPARKPOST_API_KEY);

var spark = function ({from, to, subject, message}) {
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

module.exports.spark = spark;