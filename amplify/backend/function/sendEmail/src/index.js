/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
AWS.config.update({ region: "us-east-1" });

const ses = new AWS.SES();

exports.handler = async (event) => {
  console.log("event", JSON.stringify(event));
  const to = event.arguments.input.to;
  const cc = event.arguments.input.cc;
  const bcc = event.arguments.input.bcc;
  const subject = event.arguments.input.subject;
  const body = event.arguments.input.body;

  const params = {
    Destination: {
      /* required */ CcAddresses: cc,
      ToAddresses: to,
    },
    Message: {
      /* required */
      Body: {
        /* required */
        // Html: {
        //  Charset: "UTF-8",
        //  Data: body
        // },
        Text: {
          Charset: "UTF-8",
          Data: body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: subject,
      },
    },
    Source: "simplets_desk@simplets.jp" /* required */,
    // ReplyToAddresses: [
    //    'EMAIL_ADDRESS',
    //   /* more items */
    // ],
  };

  const response = await ses.sendEmail(params).promise();
  console.log("response", response);
  return response;

  // const response = {
  //     statusCode: 200,
  // //  Uncomment below to enable CORS requests
  // //  headers: {
  // //      "Access-Control-Allow-Origin": "*"
  // //  },
  //     body: JSON.stringify('Hello from Lambda!'),
  // };
  // return response;
};
