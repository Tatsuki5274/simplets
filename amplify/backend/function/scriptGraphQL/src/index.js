"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const client_1 = require("./client");
const listSections = `
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
const updateSection = `
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
const listCategorys = `
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
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("event:", event);
    const listCategoryItem = yield client_1.executeQuery(listCategorys, {});
    const listSectionItem = yield client_1.executeQuery(listSections, {});
    console.log("listSectionItem", JSON.stringify(listSectionItem, null, 2));
    for (const element of listSectionItem === null || listSectionItem === void 0 ? void 0 : listSectionItem.data.listSections.items) {
        element.sectionCategoryName = listCategoryItem === null || listCategoryItem === void 0 ? void 0 : listCategoryItem.data.listCategorys.items.find((category) => {
            return category.localID === element.sectionCategoryLocalId;
        }).name;
        const UpdateSection = {
            sheetKeys: element.sheetKeys,
            sectionCategoryLocalId: element.sectionCategoryLocalId,
            sectionCategoryName: element.sectionCategoryName
        };
        const result = yield client_1.executeMutation(updateSection, { input: UpdateSection });
        console.log("result", JSON.stringify(result, null, 2));
    }
    ;
    console.log("listSectionItem", JSON.stringify(listSectionItem, null, 2));
    const mutationSection = client_1.executeMutation(updateSection, listSectionItem);
    console.log("mutationSection", JSON.stringify(mutationSection, null, 2));
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!aaa'),
    };
    return response;
});
