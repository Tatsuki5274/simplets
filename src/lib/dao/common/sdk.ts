import { client } from "./client";
import { ApolloQueryResult, gql } from "@apollo/client";


// Apolloを利用したGraphQLリクエスト
/**
 * @template P パラメータの型
 * @template R 戻り値の型
 * @param query 実行するクエリ
 * @param params 実行クエリに対するパラメータ
 * @returns GraphQLの実行結果
 */
export async function graphqlQuery<P, R>(query: string, params: P){
    const result = await client.query({
        query: gql(query),
        variables: params,
        fetchPolicy: 'network-only',
        errorPolicy: "all",
    }) as ApolloQueryResult<R>;
    return result
}

/**
 * @template P パラメータの型
 * @template R 戻り値の型
 * @param mutation 実行するミューテーション
 * @param params 実行ミューテーションに対するパラメータ
 * @returns GraphQLの実行結果
 */
export async function graphqlMutation<P, R>(mutation: string, params: P){
    const result = await client.mutate({
        mutation: gql(mutation),
        variables: params,
        fetchPolicy: 'no-cache',
        errorPolicy: "all",
    }) as ApolloQueryResult<R>;
    return result
}


// Amplify APIを用いたGraphQLリクエスト
// エラー処理などで問題が発生した場合は実行関数を以下に置き換える
/**
 * @template P パラメータの型
 * @template R 戻り値の型
 * @param query 実行するクエリ、ミューテーション
 * @param params 実行クエリに対するパラメータ
 * @returns GraphQLの実行結果
 */
// export async function graphqlQuery<P, R>(query: string, params: P){
//     const result = await API.graphql(graphqlOperation(query, params)) as GraphQLResult<R>;
//     return result
// }

/**
 * @template P パラメータの型
 * @template R 戻り値の型
 * @param mutation 実行するクエリ、ミューテーション
 * @param params 実行クエリに対するパラメータ
 * @returns GraphQLの実行結果
 */
// export async function graphqlMutation<P, R>(mutation: string, params: P){
//     const result = await API.graphql(graphqlOperation(mutation, params)) as GraphQLResult<R>;
//     return result
// }

