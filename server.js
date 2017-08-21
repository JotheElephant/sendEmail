
var SendGrid = require('./sendGrid').send;
var SparkPost = require('./sparkPost').spark;

//emailService input must include an object with from, to, subject, and message properties
function emailService(email) {

  //validate inputs
  var inputValid = true; //input is valid until proven false
  var message = "Message is sending..."; //the message will be this unless it runs into conditional statements below
  var fromCheck = validateEmail(email.from);
  var toCheck = validateEmail(email.to);
  //check from and to email addresses, subject and message do not exist
  if (!(email.from && email.to && email.subject && email.message)) {
    inputValid = false;
    message = "Invalid Input: all fields (i.e. from, to, subject, message) must be provided";
  //check each property type is a string
  } else if (!(typeof email.from === 'string' && typeof email.to === 'string' && typeof email.subject === 'string' && typeof email.message === 'string')) {
    inputValid = false;
    message = "Invalid Input: all fields must be in string format";
  //check from and to email addresses are in incorrect form using regex
  } else if (!fromCheck || !toCheck) {
    inputValid = false;
    message = "Invalid Input: one or two email addressed do not follow proper format";
  }

  //After inputs are validated
  if (inputValid) {
    console.log(message);
    return SendGrid(email)
      .then( (sgresponse) => {
        console.log("SendGrid success!")
      })
      .catch( (sgerror) => {
        if(sgerror) {
          console.log('SendGrid Error: ', sgerror);
          return SparkPost(email)
        }
      })
      .then( (spresponse) => {
        if(spresponse) {
          console.log("SparkPost success!", spresponse.status);
        }
      })
      .catch( (sperror) => {
        if(sperror) {
          console.log("SparkPost Error: ", sperror);
        }
      })
  }
  //show validation message if inputValid is false
  console.log(message);
}

//validateEmail:  helper function to validate email address using regex
function validateEmail(emailAddress) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(emailAddress);
}
