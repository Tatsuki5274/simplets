
const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
let graphqlClient;

let env;
let graphql_auth;

if ('AWS_EXECUTION_ENV' in process.env && process.env.AWS_EXECUTION_ENV.startsWith('AWS_Lambda_')) {
    //for cloud env
    env = process.env;
    graphql_auth = {
        type: "AWS_IAM",
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
        }
    };
} else {
    // for local mock
    env = {
        API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT: 'http://localhost:20002/graphql',
        REGION: 'us-east-1',
    }
    graphql_auth = {
        type: "AWS_IAM",
        credentials: {
            accessKeyId: 'mock',
            secretAccessKey: 'mock',
            sessionToken: 'mock',
        }
    };
}


if (!graphqlClient) {
    graphqlClient = new AWSAppSyncClient({
        url: env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT,
        region: env.REGION,
        auth: graphql_auth,
        disableOffline: true,
    });
}
exports.getSheet = async (sheetId) =>{
// async function getSheet(sheetId){
    const getSheetQuery = /* GraphQL */`
        query getSheet(
            $id: ID!
        ) {
        getSheet(id: $id) {
            statusValue
            id
        }
    }
    `;

    const queryInput = {
        id: sheetId
    }
    const result = await graphqlClient.query({
        query: gql(getSheetQuery),
        fetchPolicy: 'network-only',
        variables: queryInput,
    });
    return result.data.getSheet;
}

// async function updateSheetValue(sheetId, statusValue){
exports.updateSheetValue = async (sheetId, statusValue) => {


    const updateSheet = /* GraphQL */ `
        mutation updateSheet(
            $input: UpdateSheetInput!
        ){
        updateSheet(input: $input) {
            id
            statusValue
        }
    }
    `;


    const updateInput = {
        mutation: gql(updateSheet),
        variables: {
            input: {
                id: sheetId,
                statusValue: statusValue,
            },
        },
    };
    const res = await graphqlClient.mutate(updateInput);
    return res;
}