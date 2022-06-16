import { CreateGroupInput, Group } from "../../API";
import { createGroup } from "../../graphql/mutations";
import { GroupDao } from "../../libs/dao/groupDao";

/**
 */
const createGroupByCompanyAdmin = async (
  params: CreateGroupInput,
  companyId: string
): Promise<Group | null> => {
  params.companyID = companyId; // 会社番号を上書きする
  const createResult = await GroupDao.create(createGroup, params);
  if (!createResult) {
    throw new Error("Operation failed.");
  }

  return createResult;
};
export default createGroupByCompanyAdmin;
