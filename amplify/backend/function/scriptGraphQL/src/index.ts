/* Amplify Params - DO NOT EDIT
	API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_SCCGQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

//exports.handler = async (event) => {
export const handler = async (event: any) => {
    // TODO implement
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!aaa'),
    };
    return response;
};
