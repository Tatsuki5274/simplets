/* eslint-disable no-console */
import * as yargs from "yargs";
import AWS from "aws-sdk";

const argv = yargs
  .option("user-pool-id", {
    description: "操作対象のユーザープールID",
    demandOption: true,
  })
  .option("profile", {
    description: "認証ユーザープロファイル名",
    demandOption: true,
  })
  .help().argv;
const userPoolId = argv["user-pool-id"];
if (typeof userPoolId !== "string") {
  throw new Error("user-pool-idが文字列ではありません。");
}
const profile = argv.profile;
if (typeof profile !== "string") {
  throw new Error("profileが文字列ではありません");
}

AWS.config.update({ region: "ap-northeast-1" });

const credentials = new AWS.SharedIniFileCredentials({
  profile: profile,
});
AWS.config.credentials = credentials;
const cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();

const getUsers = async (): Promise<(string | null)[] | null> => {
  const params = {
    UserPoolId: userPoolId,
  };
  const userList = await cognitoidentityserviceprovider
    .listUsers(params)
    .promise();
  console.log(userList);
  const result = userList.Users?.map((user) => user.Username || null) || null;
  return result;
};

const main = async () => {
  const usernameList = await getUsers();
  if (!usernameList) {
    throw new Error("ユーザーを取得できませんでした");
  }
  await Promise.all(
    usernameList.map(async (username) => {
      if (!username) {
        return;
      }
      const params = {
        UserPoolId: userPoolId,
        Username: username,
      };
      await cognitoidentityserviceprovider
        .adminUserGlobalSignOut(params)
        .promise();
      console.log("loggedout.", username);
    })
  );
  console.log("done");
};

main();
