export type AmplifyDependentResourcesAttributes = {
    "auth": {
        "sccsysteme53c89f0": {
            "IdentityPoolId": "string",
            "IdentityPoolName": "string",
            "UserPoolId": "string",
            "UserPoolName": "string",
            "AppClientIDWeb": "string",
            "AppClientID": "string",
            "AppClientSecret": "string"
        },
        "api": {
            "sccgql": {
                "GraphQLAPIIdOutput": "string",
                "GraphQLAPIEndpointOutput": "string"
            },
            "function": {
                "approvalStatusManager": {
                    "Name": "string",
                    "Arn": "string",
                    "Region": "string",
                    "LambdaExecutionRole": "string"
                }
            }
                "sendEmail": {
                    "Name": "string",
                    "Arn": "string",
                    "Region": "string",
                    "LambdaExecutionRole": "string"
                },
                "scriptGraphQL": {
                    "Name": "string",
                    "Arn": "string",
                    "Region": "string",
                    "LambdaExecutionRole": "string"
                },
                "resolvers": {
                    "Name": "string",
                    "Arn": "string",
                    "Region": "string",
                    "LambdaExecutionRole": "string"
                },
                "dbStream": {
                    "Name": "string",
                    "Arn": "string",
                    "Region": "string",
                    "LambdaExecutionRole": "string"
                }
            }
        }
    }