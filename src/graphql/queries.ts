/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getDepartment = /* GraphQL */ `
  query GetDepartment($id: ID!) {
    getDepartment(id: $id) {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const listDepartments = /* GraphQL */ `
  query ListDepartments(
    $filter: ModelDepartmentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDepartments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        name
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const listCategorys = /* GraphQL */ `
  query ListCategorys(
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        code
        name
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
export const getSheet = /* GraphQL */ `
  query GetSheet($id: ID!) {
    getSheet(id: $id) {
      id
      year
      careerPlan
      careerPlanComment
      overAllEvaluation
      firstComment {
        id
        comment
        createdOn
        updatedOn
      }
      secondComment {
        id
        comment
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
      owner
    }
  }
`;
export const listSheets = /* GraphQL */ `
  query ListSheets(
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        year
        careerPlan
        careerPlanComment
        overAllEvaluation
        firstComment {
          id
          comment
          createdOn
          updatedOn
        }
        secondComment {
          id
          comment
          createdOn
          updatedOn
        }
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
export const getObjective = /* GraphQL */ `
  query GetObjective($id: ID!) {
    getObjective(id: $id) {
      id
      category {
        id
        code
        name
        createdOn
        updatedOn
      }
      objective
      result
      status
      selfEvaluation
      lastEvaluation
      createdOn
      updatedOn
      owner
    }
  }
`;
export const listObjectives = /* GraphQL */ `
  query ListObjectives(
    $filter: ModelObjectiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjectives(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        category {
          id
          code
          name
          createdOn
          updatedOn
        }
        objective
        result
        status
        selfEvaluation
        lastEvaluation
        createdOn
        updatedOn
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      comment
      createdOn
      updatedOn
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        comment
        createdOn
        updatedOn
      }
      nextToken
    }
  }
`;
