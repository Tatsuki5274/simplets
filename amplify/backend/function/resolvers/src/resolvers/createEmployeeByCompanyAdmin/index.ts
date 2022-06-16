import { EmployeeDao } from "../../libs/dao/employeeDao";
import { CreateEmployeeInput, Employee } from "../../API";
import { createEmployee } from "../../graphql/mutations";

/**
 */
const createEmployeeByCompanyAdmin = async (
  params: CreateEmployeeInput,
  companyId: string
): Promise<Employee | null> => {
  params.companyID = companyId; // 会社番号を上書きする
  const createResult = await EmployeeDao.create(createEmployee, params);
  if (!createResult) {
    throw new Error("Operation failed.");
  }

  return createResult;
};
export default createEmployeeByCompanyAdmin;
