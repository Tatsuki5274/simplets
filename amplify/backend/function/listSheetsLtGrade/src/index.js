/* Amplify Params - DO NOT EDIT
	API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_SCCGQL_GRAPHQLAPIIDOUTPUT
	AUTH_SCCSYSTEM2E3482086_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');

let graphqlClient;

exports.handler = async (event, context, callback) => {
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
            API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT: 'http://localhost/graphql',
            REGION: 'ap-northeast-1',
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

    //セッションから情報を取得
    const queryInput = {
        companyId: event['identity']['claims']['custom:companyId'],
        grade: event['identity']['claims']['custom:grade']
    }
    const listSheets = await graphqlClient.query({
        query: gql(listSheetsLtGrade),
        fetchPolicy: 'network-only',
        variables: queryInput,
    });
    return listSheets.data.listSheets.items;
};

const listSheetsLtGrade = /* GraphQL */ `
query MyQuery(
  $companyId: ID
  $grade: Int
) {
  listSheets(filter: {companyId: {eq: $companyId}, grade: {lt: $grade}}) {
    items {
      grade
      id
      companyId
      company {
        id
      }
      careerPlan
      careerPlanComment
      createdAt
      firstCheckDate
      firstComment
      overAllEvaluation
      reviewComment
      reviewDate
      reviewee
      secondCheckDate
      selfCheckDate
      updatedOn
      year
      group {
        id
      }
      interviews {
        items {
          id
        }
      }
    }
  }
}
`;