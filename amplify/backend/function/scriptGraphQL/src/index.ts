/* Amplify Params - DO NOT EDIT
	API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_SCCGQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { ApolloQueryResult } from "@apollo/client";
import { ListSheetsQuery, UpdateSheetMutationVariables } from "./API";
import { executeMutation, executeQuery } from "./client";
import { updateSheet } from "./graphql/mutations";
import { listSheets } from "./graphql/queries";

//exports.handler = async (event) => {
export const handler = async (event: any) => {
    // TODO implement
    console.log("event:",event)
    try{
        const listSheetItems: ApolloQueryResult<ListSheetsQuery> | null  = await executeQuery(listSheets,{})
        // console.log("sheets", JSON.stringify(listSheetItems, null, 2));

        if(listSheetItems?.data.listSheets?.items){
            for(const sheet of listSheetItems.data.listSheets.items){
                if(sheet?.companyID && sheet.group?.name){
                    const param: UpdateSheetMutationVariables = {
                        input: {
                            companyID: sheet.companyID,
                            year: sheet.year,
                            reviewee: sheet.reviewee,
                            sheetGroupName: sheet.group.name
                        }
                    }
                    try{
                        const result = await executeMutation(updateSheet, param)
                        console.log("result", JSON.stringify(result, null, 2))
                    }catch(err){
                        console.log("error", err)
                    }

                }else{
                    console.log("必要な情報の取得に失敗しました", sheet)
                }
            }
        }
    }catch(err){
        console.log("err", err)
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
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Done!'),
    };
    return response;
};
