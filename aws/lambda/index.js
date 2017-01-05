'use strict';

console.log('Loading function');

var AWS = require('aws-sdk');
var ses = new AWS.SES();
var https = require('https');

var RECEIVER = 'r-email'
var SENDER = 's-email'

exports.handler = function (event, context, callback) {
    console.log('Received event:', event["g-recaptcha-response"]);
    if(event["g-recaptcha-response"] === undefined || event["g-recaptcha-response"] === '' || event["g-recaptcha-response"] === null) {
        var error = new Error("recaptcha fail");
        callback(error);
    } else {
        var secretKey = "--replacewithsecret--";
        var verificationUrl = "https://www.google.com/recaptcha/api/siteverify?secret=" + secretKey + "&response=" + event["g-recaptcha-response"];

        https.get(verificationUrl, function (result) {
            console.log('Success, with: ' + result.statusCode);
            result.on("data", function(chunk) {
                var body = JSON.parse(chunk);

                if(body.success !== undefined && body.success) {
                    console.log("Sending email");
                    sendEmail(event, function (err, data) {
                        context.done(err, null)
                    })
                }
                else {
                    console.log('Captcha Error');
                    context.done("Captcha Fail");
                }
            });
          }).on('error', function (err) {
            console.log('Error, with: ' + err.message);
            context.done("Failed");
          });
    }
}

function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Name: ' + event.fullname + '\nEmail: ' + event.email + '\nTelephone: ' + event.telephone + '\nBuy or Sell: ' + event.customerType + '\nDesc: ' + event.message,
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Website Referral Form: ' + event.fullname,
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    }
    ses.sendEmail(params, done)
}
