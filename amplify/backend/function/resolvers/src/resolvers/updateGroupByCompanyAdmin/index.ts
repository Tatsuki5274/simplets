import { Group, UpdateGroupInput } from "../../API";
import { updateGroup } from "../../graphql/mutations";
import { getGroup } from "../../graphql/queries";
import { GroupDao } from "../../libs/dao/groupDao";

/**
 */
const updateGroupByCompanyAdmin = async (
  params: UpdateGroupInput,
  companyId: string
): Promise<Group | null> => {
  delete params.companyID; // 会社番号の変更は無効化する
  const group = await GroupDao.get(getGroup, {
    id: params.id,
  });
  if (group?.companyID !== companyId) {
    throw new Error("You don't have permission");
  }
  const updateResult = await GroupDao.update(updateGroup, params);
  if (!updateResult) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return updateResult;
};
export default updateGroupByCompanyAdmin;
