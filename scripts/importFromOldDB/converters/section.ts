import { CreateSectionInput } from "../libs/API";
import { generateListString } from "./util";
import { v4 as uuidv4 } from 'uuid';

export function generateSection(dd: any, sheetId: string): CreateSectionInput {
    const id = uuidv4();

    const result: CreateSectionInput = {
        id: id,
        sheetID: sheetId,
        no: dd.sectionCategoryLocalId?.S,

        sectionCategoryName: dd.sectionCategoryName?.S || null,

        reviewee: dd.reviewee?.S || null,
        topReviewers: generateListString(dd.topReviewers),
        secondReviewers: generateListString(dd.secondReviewers),
        referencer: generateListString(dd.referencer),
    }
    return result
}