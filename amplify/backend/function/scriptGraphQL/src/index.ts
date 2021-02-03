/* Amplify Params - DO NOT EDIT
	API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_SCCGQL_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

import { executeMutation, executeQuery } from "./client";

const listSections = /* GraphQL */ `
  query ListSections(
    $sheetKeys: ID
    $sectionCategoryLocalId: ModelIDKeyConditionInput
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSections(
      sheetKeys: $sheetKeys
      sectionCategoryLocalId: $sectionCategoryLocalId
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        sheetKeys
        sectionCategoryLocalId
        sectionCategoryName
        companyID
        reviewee
        topReviewers
        secondReviewers
        referencer
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
      sheetKeys
      sectionCategoryLocalId
      sectionCategoryName
    }
  }
`;

type UpdateSectionInput = {
    sheetKeys: string,
    sectionCategoryLocalId: string,
    sectionCategoryName?: string | null,
    companyID?: string | null,
    reviewee?: string | null,
    topReviewers?: Array< string > | null,
    secondReviewers?: Array< string > | null,
    referencer?: Array< string > | null,
  };

const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $companyID: ID
    $localID: ModelIDKeyConditionInput
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listCategorys(
      companyID: $companyID
      localID: $localID
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

//exports.handler = async (event) => {
export const handler = async (event: any) => {
    // TODO implement
    console.log("event:",event)
    const listCategoryItem = await executeQuery(listCategorys,{})
    const listSectionItem = await executeQuery(listSections,{})
    console.log("listSectionItem", JSON.stringify(listSectionItem, null, 2));
    for (const element of listSectionItem?.data.listSections.items) {
    // listSectionItem?.data.listSections.items.for( async (element: any) => {
        
        element.sectionCategoryName = listCategoryItem?.data.listCategorys.items.find((category:any) => {
            return category.localID === element.sectionCategoryLocalId
        }).name
        const UpdateSection : UpdateSectionInput = {
            sheetKeys:element.sheetKeys,
            sectionCategoryLocalId: element.sectionCategoryLocalId,
            sectionCategoryName: element.sectionCategoryName
        }
        const result = await executeMutation(updateSection,{input:UpdateSection})
        console.log("result", JSON.stringify(result, null, 2));
    };
    console.log("listSectionItem", JSON.stringify(listSectionItem, null, 2));
    const mutationSection = executeMutation(updateSection,listSectionItem)
    console.log("mutationSection", JSON.stringify(mutationSection, null, 2));
    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  }, 
        body: JSON.stringify('Hello from Lambda!aaa'),
    };
    return response;
};
