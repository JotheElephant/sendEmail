var config = require('./config').apiKey;
var helper = require('sendgrid').mail;

var sendGridProvider = function ({from, to, subject, message}) {
  //store to, from, subject, message on class
  var fromEmail = new helper.Email(from);
  var toEmail = new helper.Email(to);
  var content = new helper.Content('text/plain', message);
  var mail = new helper.Mail(fromEmail, subject, toEmail, content);


//create send request for SendGrid
  var sg = require('sendgrid')(config.SENDGRID_API_KEY);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON()
  });

  return sg.API(request)
}

module.exports.sendGridProvider = sendGridProvider;


