import { SendEmail } from "App";
import * as APIt from 'API';
import API, { GraphQLResult, graphqlOperation }
    from '@aws-amplify/api';
import { sendEmail } from "graphql/mutations";

export async function sendEmailMutation(sendEmailInput: SendEmail) {
    const sendEmailItem: SendEmail = sendEmailInput

    const sendI: APIt.sendEmailInput = {
        to: sendEmailItem.to,
        cc: sendEmailItem.cc,
        bcc: sendEmailItem.bcc,
        subject: sendEmailItem.subject,
        body: sendEmailItem.body
    }


    const sendMV: APIt.SendEmailMutationVariables = {
        input: sendI
    }

    const sendR: GraphQLResult<APIt.SendEmailMutation> = await API.graphql(graphqlOperation(sendEmail, sendMV)) as GraphQLResult<APIt.SendEmailMutation>
    return sendR
}