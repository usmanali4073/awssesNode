var AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });
var fs = require("fs");

class SendEmail {
  readFile() {
    var content = fs.readFileSync("beefree-i8qrj7wf0j.html", "utf8");
    return content;
  }

  sendEmailToSES(content) {
    var params = {
      Destination: {
        /* required */
        ToAddresses: [
          "info@speaya.com",
          /* more items */
        ],
      },
      Message: {
        /* required */
        Body: {
          /* required */
          Html: {
            Charset: "UTF-8",
            Data: content,
          },
          Text: {
            Charset: "UTF-8",
            Data: "tes",
          },
        },
        Subject: {
          Charset: "UTF-8",
          Data: "From Haven email",
        },
      },
      Source: "info@speaya.com" /* required */,
    };

    var sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
      .sendEmail(params)
      .promise();
    sendPromise
      .then((data) => {
        console.log(data.MessageId);
      })
      .catch((err) => {
        console.error(err, err.stack);
      });
  }
}

let sendemail = new SendEmail();
let content = sendemail.readFile();
console.log(content);
sendemail.sendEmailToSES(content);
