import { ApolloQueryResult } from "@apollo/client"
import { ListSheetsQuery, UpdateSheetMutationVariables } from "../API"
import { executeMutation, executeQuery } from "../client"
import { updateSheet } from "../graphql/mutations"
import { listSheets } from "../graphql/queries"

export default async function (){
    const listSheetItems: ApolloQueryResult<ListSheetsQuery> | null  = await executeQuery(listSheets,{})
    // console.log("sheets", JSON.stringify(listSheetItems, null, 2));

    // if(listSheetItems?.data.listSheets?.items){
    //     for(const sheet of listSheetItems.data.listSheets.items){
    //         if(sheet?.companyID && sheet.group?.name){
    //             const param: UpdateSheetMutationVariables = {
    //                 input: {
    //                     companyID: sheet.companyID,
    //                     year: sheet.year,
    //                     reviewee: sheet.reviewee,
    //                     sheetGroupName: sheet.group.name
    //                 }
    //             }
    //             try{
    //                 const result = await executeMutation(updateSheet, param)
    //                 console.log("result", JSON.stringify(result, null, 2))
    //             }catch(err){
    //                 console.log("error", err)
    //             }

    //         }else{
    //             console.log("必要な情報の取得に失敗しました", sheet)
    //         }
    //     }
    // }
}