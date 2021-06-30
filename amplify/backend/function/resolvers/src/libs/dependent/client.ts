import AWSAppSyncClient from "aws-appsync";
import { ApolloQueryResult, gql } from "@apollo/client";
import aws from "aws-sdk";
import { env } from "process";

require("isomorphic-fetch");

const endpoint = env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT;
const region = env.REGION;
const credentials = aws.config.credentials;

if (!credentials || !region || !endpoint) {
  throw new Error("GraphQLクライアントの初期化に失敗しました");
}

const client = new AWSAppSyncClient({
  url: endpoint,
  region: region,
  auth: {
    type: "AWS_IAM",
    credentials: () => credentials,
  },
  disableOffline: true,
});

// Apolloを利用したGraphQLリクエスト
/**
 * @template P パラメータの型
 * @template R 戻り値の型
 * @param query 実行するクエリ
 * @param params 実行クエリに対するパラメータ
 * @returns GraphQLの実行結果
 */
export async function graphqlQuery(query: string, params: unknown) {
  const result = (await client.query({
    query: gql(query),
    variables: params,
    fetchPolicy: "network-only",
    errorPolicy: "all",
  })) as ApolloQueryResult<unknown>;
  return result;
}

/**
 * @template P パラメータの型
 * @template R 戻り値の型
 * @param mutation 実行するミューテーション
 * @param params 実行ミューテーションに対するパラメータ
 * @returns GraphQLの実行結果
 */
export async function graphqlMutation(mutation: string, params: unknown) {
  const result = (await client.mutate({
    mutation: gql(mutation),
    variables: params,
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  })) as ApolloQueryResult<unknown>;
  return result;
}
