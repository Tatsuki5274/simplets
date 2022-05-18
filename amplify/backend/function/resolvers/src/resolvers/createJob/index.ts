import { CreateJobInput, Job } from "../../API";
import { createJob } from "../../graphql/mutations";
import { JobDao } from "../../libs/dao/jobDao";

/**
 */
const createJobRes = async (params: CreateJobInput): Promise<Job | null> => {
  const createResult = await JobDao.create(createJob, params);
  if (!createResult) {
    throw new Error("Operation failed.");
  }

  return createResult;
};
export default createJobRes;
