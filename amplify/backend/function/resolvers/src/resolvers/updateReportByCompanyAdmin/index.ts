import { ReportDao } from "../../libs/dao/reportDao";
import { Report, UpdateReportInput } from "../../API";
import { updateReport } from "../../graphql/mutations";
import { getReport } from "../../graphql/queries";

/**
 */
const updateReportByCompanyAdmin = async (
  params: UpdateReportInput,
  companyId: string
): Promise<Report | null> => {
  const report = await ReportDao.get(getReport, { id: params.id });
  if (report?.companyID !== companyId) {
    // データの所有者が別の会社のデータなら削除は許可しない
    throw new Error("You don't have permission");
  }
  const updateResult = await ReportDao.update(updateReport, params);
  if (!updateResult) {
    throw new Error("Operation failed.");
  }

  return report;
};
export default updateReportByCompanyAdmin;
