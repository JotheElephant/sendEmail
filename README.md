# sendEmail Service

Create a service that accepts the necessary information and sends emails. It should provide an abstraction between two different email service providers. If one of the services goes down, your service can quickly failover to a different provider without affecting your customers.

  Example Email Providers:
  * SendGrid  -Simple Send Documentation
  * Mailgun  -Simple Send Documentation
  * SparkPost  -Developer Hub
  * Amazon SES  -Simple Send Documentation

All listed services are free to try and are pretty painless to sign up for, so please register your own test accounts on each.

### REQUIREMENTS

Node v8.0.0^

### SETUP

- From root directory, run ```npm install```
- Setup each account and obtain API keys for both SendGrid and SparkPost
- Create a config.js file that exports an object containing both SENDGRID_API_KEY and SPARKPOST_API_KEY as properties with your API keys
- Run ```node server.js``` or ```npm start``` in terminal
