import AWSAppSyncClient from "aws-appsync";
import { env } from "process";
import aws from "aws-sdk";
import gql from "graphql-tag";
import { ApolloQueryResult, NormalizedCacheObject } from "@apollo/client";

require("isomorphic-fetch");

// clientをキャッシュして例外を返す仕組みを検討
const client = getClient();

function getClient() {
  const endpoint = env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT;
  const region = env.REGION;
  const credentials = aws.config.credentials;
  const regexp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;

  if (!endpoint?.match(regexp)) {
    throw new Error(`GraphQL endpoint is not correct(${endpoint})`);
  }

  if (credentials && endpoint && region) {
    const appSyncClient = new AWSAppSyncClient({
      url: endpoint,
      region: region,
      auth: {
        type: "AWS_IAM",
        credentials: () => credentials,
      },
      disableOffline: true,
    });
    return appSyncClient;
  } else {
    console.log("Error GraphQL Client", {
      endpoint: endpoint,
      region: region,
      credentials: credentials,
    });
    return null;
  }
}

export async function graphqlQuery(query: string, params: unknown) {
  if (client) {
    const result = await client.query({
      query: gql(query),
      variables: params,
    });
    return result;
  }
  return null;
}

export async function graphqlMutation(mutation: string, params: unknown) {
  if (client) {
    const res = await client.mutate({
      mutation: gql(mutation),
      variables: params,
    });
    return res;
  } else {
    return null;
  }
}
