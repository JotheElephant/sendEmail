var helper = require('sendgrid').mail;

var SendGridProvider = function () {
  this.apiKey = require('./config').apiKey.SENDGRID_API_KEY;
  this.sendGridAPI = require('sendgrid')(this.apiKey);
};

SendGridProvider.prototype.send = function({from, to, subject, message}) {
  var fromEmail = new helper.Email(from);
  var toEmail = new helper.Email(to);
  var message = new helper.Content('text/plain', message)
  var mail = new helper.Mail(fromEmail, subject, toEmail, message);
  var request = this.sendGridAPI.emptyRequest({
    method: 'POST',
    path: '/v3/mail/sd',
    body: mail.toJSON()
  });

  return this.sendGridAPI.API(request);
};

module.exports.SendGridProvider = SendGridProvider;


