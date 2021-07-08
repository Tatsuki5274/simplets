import { Company } from "../../API";
import { CompanyDao } from "../../libs/dao/companyDao";

/**
 */
const getOwnCompany = async (
  query: string,
  companyId: string
): Promise<Company | null> => {
  const company = await CompanyDao.get(query, { id: companyId });
  return company;
};
export default getOwnCompany;
