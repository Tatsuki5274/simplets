import { EmployeeDao } from "../../libs/dao/employeeDao";
import { Employee, UpdateEmployeeInput } from "../../API";
import { updateEmployee } from "../../graphql/mutations";
import { getEmployee } from "../../graphql/queries";

/**
 */
const updateEmployeeByCompanyAdmin = async (
  params: UpdateEmployeeInput,
  companyId: string
): Promise<Employee | null> => {
  const employee = await EmployeeDao.get(getEmployee, {
    username: params.username,
  });
  if (employee?.companyID !== companyId) {
    throw new Error("You don't have permission");
  }
  const createResult = await EmployeeDao.update(updateEmployee, params);
  if (!createResult) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return createResult;
};
export default updateEmployeeByCompanyAdmin;
