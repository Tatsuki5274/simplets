import AWS from "aws-sdk";
import { InvocationResponse } from "aws-sdk/clients/lambda";
const lambda = new AWS.Lambda();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default async function InvokeUpdateOwners(companyId: string) {
  if (!process.env.FUNCTION_UPDATEOWNER_NAME) {
    throw new Error("Function name is not defined");
  }
  const payload = {
    companyId: companyId,
  };
  const payloadJson = JSON.stringify(payload);
  const params = {
    FunctionName: process.env.FUNCTION_UPDATEOWNER_NAME,
    InvocationType: "RequestResponse",
    Payload: payloadJson,
  };
  invokePromiseFunction(params)
    .then((data) => console.log("done", JSON.stringify(data)))
    .catch((error) => console.error(JSON.stringify(error)));

  // // Lambda関数呼び出し
  // const callLambda = lambda.invoke(params).promise();
  // callLambda
  //   .then((data) => console.log("done", JSON.stringify(data)))
  //   .catch((error) => console.error(JSON.stringify(error)));
  console.log("done");
}

const invokePromiseFunction = (payload: InvocationResponse) => {
  if (!process.env.FUNCTION_UPDATEOWNER_NAME) {
    throw new Error("Function name is not defined");
  }
  return lambda
    .invoke({
      FunctionName: process.env.FUNCTION_UPDATEOWNER_NAME,
      Payload: JSON.stringify(payload),
    })
    .promise();
};
