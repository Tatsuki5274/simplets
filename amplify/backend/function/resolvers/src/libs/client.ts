import AWSAppSyncClient from "aws-appsync";
import { env } from "process";
import aws from 'aws-sdk';
import gql from "graphql-tag";
import { NormalizedCacheObject } from "apollo-cache-inmemory";

require('isomorphic-fetch')

/* 使い方
const client = new GraphQLClient(); //クライアントを初期化する
const sheet = await client.query(getSheet, {})  // クエリを実行

型ガードと一緒に使うとより安全
if(!isSheet(sheet.data)) {
  throw new TypeError("TypeError");
}
sheet.year //型が保証される
*/
export class GraphQLClient {
  client: AWSAppSyncClient<NormalizedCacheObject>;

  constructor() {
    // 必要な情報の確認
    if (!env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT) {
      // エンドポイントの環境変数が未設定
      throw new Error("endpoint is undefined");
    }
    if (!env.REGION) {
      // エンドポイントのリージョンが未設定
      throw new Error("region is undefined");
    }
    if (!aws.config.credentials){
      // 認証が存在しない
      throw new Error("credentials is undefined");
    }

    const endpoint = env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
    const region = env.REGION
    const credentials = aws.config.credentials

    // エンドポイントの形式を確認
    const regexp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/
    if(!endpoint?.match(regexp)){
      // エンドポイントの形式が不適切な場合
      throw new Error(`GraphQL endpoint is not correct(${endpoint})`)
    }
    
    const appSyncClient = new AWSAppSyncClient({
      url: endpoint,
      region: region,
      auth: {
        type: "AWS_IAM",
        credentials: ()=> credentials
      },
      disableOffline: true,
    });
    this.client = appSyncClient;
  }

  /**
   * 
   * @param query クエリ文字列
   * @param params クエリパラメータ
   * @returns GraphQLクエリの実行結果
   */
  async query(query: string, params: unknown) {
    const result = await this.client.query({
      query: gql(query),
      variables: params,
      errorPolicy: "all",
    });
    return result;
  }

  /**
   * 
   * @param mutation ミューテーション文字列
   * @param params ミューテーションパラメータ
   * @returns GraphQLミューテーションの実行結果
   */
  async mutate(mutation: string, params: unknown) {
    const result = await this.client.mutate({
      mutation: gql(mutation),
      variables: params,
      errorPolicy: "all",
    });
    return result;
  }
}

const client = getClient()

/**
 * @deprecated
 */
function getClient(){
    const endpoint = env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
    const region = env.REGION
    const credentials = aws.config.credentials
    const regexp = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/

    if(!endpoint?.match(regexp)){
      throw new Error(`GraphQL endpoint is not correct(${endpoint})`)
    }
    
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

/**
 * @deprecated
 */
export async function graphqlQuery(query: string, params: unknown){
  if(client){
    const result = await client.query({
      query: gql(query),
      variables: params,
      errorPolicy: "all",
    })
    return result
  }
  return null
}

/**
 * @deprecated
 */
export async function graphqlMutation(mutation: string, params: unknown){
  if(client){
    const res = await client.mutate({
      mutation: gql(mutation),
      variables: params,
      errorPolicy: "all",
    })
    return res
  }else{
    return null
  }
 
}