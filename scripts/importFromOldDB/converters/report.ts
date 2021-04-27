import { CreateReportInput } from "../libs/API";
import { generateListString } from "./util";

export function generateReport(dd: any, sub: string): CreateReportInput {
    const result: CreateReportInput = {
        sub: sub,
        date: dd.date.S,

        reviewee: dd.reviewee?.S,
        reviewer: generateListString(dd.reviewer),
        companyID: dd.companyID.S || null,
        referencer: generateListString(dd.referencer),

        revieweeComments: {
            other: dd.revieweeComments?.M.other?.S || null,
            status: dd.revieweeComments?.M.status?.S || null,
            work: dd.revieweeComments?.M.work.S || null,
        },
        reviewerComments: {
            superior: dd.reviewerComments?.M.superior?.S || null
        },
        workStatus: dd.workStatus?.S || null,
    }
    return result
}