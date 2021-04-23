import AWSAppSyncClient, { AUTH_TYPE } from 'aws-appsync'
import AWS from "aws-sdk";
import * as configJson from "../../../config.json";

require('isomorphic-fetch')

export const config = configJson.refactor;  // エンドポイントの切り替え
export const credentialProfile = "SCC"; //credentialのプロファイル名
// const token = async ()=>{
//   return (await Auth.currentSession()).getIdToken().getJwtToken()
// }
var credentials = new AWS.SharedIniFileCredentials({profile: credentialProfile});
export const client = new AWSAppSyncClient({
  url: config.graphqlEndpoint,
  region: config.region,
  disableOffline: true,
  auth: {
    type: "AWS_IAM",
    credentials: {
      accessKeyId: credentials.accessKeyId,
      secretAccessKey: credentials.secretAccessKey,
    }
  }
})