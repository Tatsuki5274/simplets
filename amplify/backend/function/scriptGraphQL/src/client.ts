import AWSAppSyncClient from "aws-appsync";
import { env } from "process";
import aws from 'aws-sdk';
// import * as APIt from '../API';
import gql from "graphql-tag";
import { ApolloQueryResult } from "@apollo/client";
// import { VodAsset } from "../type";

require('isomorphic-fetch')


const client = getClient()

function getClient(){
    const endpoint = env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
    const region = env.REGION
    const credentials = aws.config.credentials
    // const accessKeyId = env.AWS_ACCESS_KEY_ID
    // const secretAccessKey = env.AWS_SECRET_ACCESS_KEY
    // const sessionToken = env.AWS_SESSION_TOKEN
    
    if(credentials && endpoint && region){
      const appSyncClient = new AWSAppSyncClient({
        url: endpoint,
        region: region,
        auth: {
          type: "AWS_IAM",
          credentials: ()=> credentials
        },
        disableOffline: true,
      });
      return appSyncClient
    }else{
      console.log("Error GraphQL Client", {
        endpoint: endpoint,
        region: region,
        credentials: credentials
      })
      return null
    }
}

export async function executeQuery(query: string, params: any){
  if(client){
    const result: ApolloQueryResult<any> = await client.query({
      query: gql(query),
      variables: params
    })
    const asset = result
    return asset
  }
  return null
}

export async function executeMutation(mutation: string, params: any){
  if(client){
    const res = await client.mutate({
      mutation: gql(mutation),
      variables: params,
    })
    return res
  }else{
    return null
  }
 
}