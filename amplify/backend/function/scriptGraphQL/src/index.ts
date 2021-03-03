/* Amplify Params - DO NOT EDIT
	API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_SCCGQL_GRAPHQLAPIIDOUTPUT
    AUTH_SCCSYSTEME53C89F0_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { ApolloQueryResult } from "@apollo/client";
import { ListSheetsQuery, UpdateSheetMutationVariables } from "./API";
import { executeMutation, executeQuery } from "./client";
import { updateSheet } from "./graphql/mutations";
import { listSheets } from "./graphql/queries";
import addEmployeesSub from "./scripts/addEmployeesSub";
import addGroupName from "./scripts/addGroupName";
import importOldSheets from "./scripts/importOldSheets";

enum ScriptTarget {
    ADD_GROUP_NAME="ADD_GROUP_NAME",
    ADD_EMPLOYEES_SUB="ADD_EMPLOYEES_SUB",
    IMPORT_OLD_SHEETS="IMPORT_OLD_SHEETS",
}

type Event = {
    target: ScriptTarget
    isPreview?: boolean
}

//exports.handler = async (event) => {
export const handler = async (event: Event) => {
    // TODO implement
    console.log("event:",event)

    let response = {
        statusCode: 200,
        body: JSON.stringify('Empty'),
    };
    try{
        switch(event.target){
            case ScriptTarget.ADD_GROUP_NAME:
                await addGroupName()
                break
            case ScriptTarget.ADD_EMPLOYEES_SUB:
                await addEmployeesSub()
                break
            case ScriptTarget.IMPORT_OLD_SHEETS:
                await importOldSheets(event.isPreview)
                break
            default:
                throw new Error("不明なイベントが指定されました");
        }
    }catch(e){
        console.log("例外", e)
    }finally{

    }



    // for (const element of listSectionItem?.data.listSections.items) {
    // // listSectionItem?.data.listSections.items.for( async (element: any) => {
        
    //     element.sectionCategoryName = listCategoryItem?.data.listCategorys.items.find((category:any) => {
    //         return category.localID === element.sectionCategoryLocalId
    //     }).name
    //     const UpdateSection : UpdateSectionInput = {
    //         sheetKeys:element.sheetKeys,
    //         sectionCategoryLocalId: element.sectionCategoryLocalId,
    //         sectionCategoryName: element.sectionCategoryName
    //     }
    //     // console.log("params", JSON.stringify(UpdateSection, null, 2));
    //     const result = await executeMutation(updateSection,{input:UpdateSection})
    //     console.log("result", JSON.stringify(result, null, 2));
    // };
    // console.log("listSectionItem", JSON.stringify(listSectionItem, null, 2));
    // // const mutationSection = executeMutation(updateSection,listSectionItem)
    // // console.log("mutationSection", JSON.stringify(mutationSection, null, 2));

    return response;
};
