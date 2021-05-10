import { CreateEmployeeInput } from "../libs/API";

export function generateEmployee(dd: any, groupId: string, sub: string): CreateEmployeeInput {
    const result: CreateEmployeeInput = {
        username: dd.username?.S,

        companyID: dd.companyID?.S,

        no: dd.localID?.S,
        groupID: groupId,
        superiorUsername: dd.superiorUsername?.S,

        firstName: dd.firstName?.S,
        lastName: dd.lastName?.S,
        grade: dd.grade?.S,
        email: dd.email?.S,
        sub: sub,

        manager: dd.manager?.S,
        isCompanyAdmin: dd.isCompanyAdmin?.BOOL || false,
        isDeleted: dd.isDeleted?.S,
    }
    return result
}