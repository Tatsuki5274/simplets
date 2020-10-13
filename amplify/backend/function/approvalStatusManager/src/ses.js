const AWS = require('aws-sdk');
AWS.config.update({region: 'ap-northeast-1'});
// var credentials = new AWS.SharedIniFileCredentials({profile: 'scc'});
// AWS.config.credentials = credentials;

const ses = new AWS.SES();

// 引数の構造
// type Props = {
//   to: string[],
//   cc: string[],
//   bcc: string[],
//   subject: string,
//   message: string
// }
exports.sendEmail = async (props) => {
    const params = {
        Destination: { /* required */
        //   CcAddresses: [
        //     'EMAIL_ADDRESS',
        //     /* more items */
        //   ],
          ToAddresses: [
            'twatanabe@sisco-consulting.co.jp',
            /* more items */
          ]
        },
        Message: { /* required */
          Body: { /* required */
            Html: {
             Charset: "UTF-8",
             Data: "props.message"
            },
            Text: {
             Charset: "UTF-8",
             Data: "props.message"
            }
           },
           Subject: {
            Charset: 'UTF-8',
            Data: "props.subject"
           }
          },
        Source: 'twatanabe@sisco-consulting.co.jp', /* required */
        // ReplyToAddresses: [
        //    'EMAIL_ADDRESS',
        //   /* more items */
        // ],
    };
    
    const response = await ses.sendEmail(params).promise();
    return response
}