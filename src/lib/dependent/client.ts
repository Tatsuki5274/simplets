import { Auth } from "aws-amplify";
import awsconfig from "aws-exports";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloQueryResult, gql } from "@apollo/client";

const token = async () => {
  return (await Auth.currentSession()).getIdToken().getJwtToken();
};

const client = new AWSAppSyncClient({
  url: awsconfig.aws_appsync_graphqlEndpoint,
  region: awsconfig.aws_appsync_region,
  auth: {
    type: awsconfig.aws_appsync_authenticationType as AUTH_TYPE.AMAZON_COGNITO_USER_POOLS,
    jwtToken: token,
  },
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
