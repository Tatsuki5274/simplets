import { updateOwners } from "graphql/mutations";
import { graphqlMutation } from "./dao/common/client";

export async function updateOwnersMutation() {
  const createR = await graphqlMutation(updateOwners, {});
  return createR;
}
