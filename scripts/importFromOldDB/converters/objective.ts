import { CreateObjectiveInput } from "../libs/API";
import { generateListString } from "./util";

export function generateObjective(dd: any, sectionId: string): CreateObjectiveInput {
    const result: CreateObjectiveInput = {
        sectionID: sectionId,

        createdAt: dd.createdAt?.S,

        companyID: dd.companyID?.S,

        content: dd.content?.S,
        result: dd.result?.S || null,
        priority: dd.priority?.S || null,
        selfEvaluation: dd.selfEvaluation?.N || null,
        firstEvaluation: dd.firstEvaluation?.N || null,
        lastEvaluation: dd.lastEvaluation?.N || null,

        progress: dd.progress?.N || null,

        expStartDate: dd.expStartDate?.S || null,
        expDoneDate: dd.expDoneDate?.S || null,

        referencer: generateListString(dd.referencer),
        reviewee: dd.reviewee?.S || null,

        topReviewers: generateListString(dd.topReviewers),
        secondReviewers: generateListString(dd.secondReviewers),
    }
    return result
}