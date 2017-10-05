
var SendGridProvider = require('./sendGrid').SendGridProvider;
var SparkPostProvider = require('./sparkPost').SparkPostProvider;
var helpers = require('./helpers');

//emailService input must include an object with from, to, subject, and message properties
function emailService(email) {
  this.inputValid = true;
  this.email = email;
  this.message = "";
}

emailService.prototype.validateContent = function(email) {
  //check from and to email addresses, subject and message do not exist
  if (!email.from && !email.to && (!email.subject || !email.message)) {
    this.message = "Invalid Input: all fields (i.e. from, to, subject, message) must be provided";
    this.inputValid = false;
  //check each property type is a string
  } else if (helpers.isString(email.from) && helpers.isString(email.to) && helpers.isString(email.subject) && helpers.isString(email.message)) {
    this.message = "Invalid Input: all fields must be in string format";
    this.inputValid = false;
  //check from and to email addresses are in incorrect form using regex
  } else if (!helpers.validateEmailAddress(email.from) || !helpers.validateEmailAddress(email.to)) {
    this.message = "Invalid Input: one or both email addresses do not follow proper format";
    this.inputValid = false;
  }

}

emailService.prototype.sendEmail = function() {
  this.validateContent(this.email);
  //After inputs are validated
  if (this.inputValid) {
    var sendGrid = new SendGridProvider();
    return sendGrid.send(this.email)
      .then( (sgresponse) => {
        console.log("SendGrid success!")
      })
      .catch( (sgerror) => {
        if(sgerror) {
          console.error('SendGrid Error: ', sgerror);
          var sparkPost = new SparkPostProvider();
          return sparkPost.send(this.email);
        }
      })
      .then( (spresponse) => {
        if(spresponse) {
          console.log("SparkPost success!");
        }
      })
      .catch( (sperror) => {
        if(sperror) {
          console.error("SparkPost Error: ", sperror);
        }
      })
  }
  //show validation message if inputValid is false
  console.error(this.message);
}