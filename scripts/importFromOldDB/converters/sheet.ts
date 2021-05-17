import { CreateSheetInput } from "../libs/API"
import { generateListString } from "./util"
import { v4 as uuidv4 } from 'uuid';

//dd = dynamo data
export default function generateSheet(dd: any, groupId: string, sub: string): CreateSheetInput {
    const id = uuidv4();
    const result: CreateSheetInput = {
        id: id,
        sub: sub,
        year: dd.year?.N,
        companyID: dd.companyID?.S,
        groupID: groupId,
        grade: dd.grade?.S,
        careerPlan: dd.careerPlan?.S || null,
        careerPlanComment: dd.careerPlanComment?.S || null,
        reviewComment: dd.reviewComment?.S || null,
        reviewDate: dd.reviewDate?.S || null,
        selfCheckDate: dd.selfCheckDate?.S || null,
        firstComment: dd.firstComment?.S || null,
        firstCheckDate: dd.firstCheckDate?.S || null,
        secondComment: dd.secondComment?.S || null,
        secondCheckDate: dd.secondCheckDate?.S || null,
        overAllEvaluation: dd.overAllEvaluation?.N || null,
        statusValue: dd.statusValue?.N || 1,

        interviewPlanDate: dd.interviewPlanDate?.S || null,
        interviewPlanComment: dd.interviewPlanComment?.S || null,
        InterviewMid1Date: dd.InterviewMid1Date?.S || null,
        InterviewMid1Comment: dd.InterviewMid1Comment?.S || null,
        InterviewMid2Date: dd.InterviewMid2Date?.S || null,
        InterviewMid2Comment: dd.InterviewMid2Comment?.S || null,
        InterviewMid3Date: dd.InterviewMid3Date?.S || null,
        InterviewMid3Comment: dd.InterviewMid3Comment?.S || null,

        revieweeUsername: dd.revieweeUsername?.S,
        secondUsername: dd.secondUsername?.S,
        topUsername: generateListString(dd.topReviewers)[0] || null,

        sheetGroupName: dd.sheetGroupName?.S || null,

        referencer: generateListString(dd.referencer),
        reviewee: dd.reviewee?.S,

        topReviewers: generateListString(dd.topReviewers),
        secondReviewers: generateListString(dd.secondReviewers),
    }
    return result
}