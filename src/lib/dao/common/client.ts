import { Auth } from "aws-amplify";
import awsconfig from "aws-exports";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";

const token = async () => {
  return (await Auth.currentSession()).getIdToken().getJwtToken();
};
export const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: token,
  },
});
