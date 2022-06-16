import { SheetDao } from "../../libs/dao/sheetDao";
import { Sheet, UpdateSheetInput } from "../../API";
import { updateSheet } from "../../graphql/mutations";
import { getSheet } from "../../graphql/queries";

/**
 */
const updateSheetByCompanyAdmin = async (
  params: UpdateSheetInput,
  companyId: string
): Promise<Sheet | null> => {
  const sheet = await SheetDao.get(getSheet, {
    id: params.id,
  });
  if (sheet?.companyID !== companyId) {
    throw new Error("You don't have permission.");
  }
  const updateResult = await SheetDao.update(updateSheet, params);
  if (!updateResult) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return updateResult;
};
export default updateSheetByCompanyAdmin;
