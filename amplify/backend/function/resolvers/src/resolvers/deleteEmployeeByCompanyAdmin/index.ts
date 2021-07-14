import { EmployeeDao } from "../../libs/dao/employeeDao";
import { DeleteEmployeeInput, Employee } from "../../API";
import { deleteEmployee } from "../../graphql/mutations";
import { getEmployee } from "../../graphql/queries";

/**
 */
const deleteEmployeeByCompanyAdmin = async (
  params: DeleteEmployeeInput,
  companyId: string
): Promise<Employee | null> => {
  const employee = await EmployeeDao.get(getEmployee, {
    username: params.username,
  });
  if (employee?.companyID !== companyId) {
    throw new Error("You don't have permission");
  }
  const createResult = await EmployeeDao.delete(deleteEmployee, params);
  if (!createResult) {
    // 自社の評価シートではない場合
    throw new Error("Operation failed.");
  }

  return createResult;
};
export default deleteEmployeeByCompanyAdmin;
