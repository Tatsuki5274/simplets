import { DeleteGroupInput, Group } from "../../API";
import { deleteGroup } from "../../graphql/mutations";
import { getGroup } from "../../graphql/queries";
import { GroupDao } from "../../libs/dao/groupDao";

/**
 */
const deleteGroupByCompanyAdmin = async (
  params: DeleteGroupInput,
  companyId: string
): Promise<Group | null> => {
  const group = await GroupDao.get(getGroup, {
    id: params.id,
  });
  if (group?.companyID !== companyId) {
    throw new Error("You don't have permission.");
  }
  const deleteResult = await GroupDao.delete(deleteGroup, params);
  if (!deleteResult) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return deleteResult;
};
export default deleteGroupByCompanyAdmin;
