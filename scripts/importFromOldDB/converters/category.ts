import { CreateCategoryInput } from "../libs/API";

export function generateCategory(dd: any): CreateCategoryInput {
    const result: CreateCategoryInput = {
        companyID: dd.companyID?.S,

        no: dd.localID?.S,
        name: dd.name?.S,
    }
    return result
}