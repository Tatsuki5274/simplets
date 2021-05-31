import { graphqlMutation } from "../client";
import { UpdateEmployeeMutationVariables } from "../API";
import { updateEmployee } from "../graphql/mutations";

export default async function (
  username: string,
  sub: string,
  companyId: string
) {
  const param: UpdateEmployeeMutationVariables = {
    input: {
      companyID: companyId,
      username: username,
      sub: sub,
    },
  };

  //更新処理の実行
  try {
    const updated = await graphqlMutation(updateEmployee, param);
    console.log("result", updated);
  } catch (e) {
    console.log(JSON.stringify(e, null, 2));
  }

  return 1;
}
