/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      no
      firstName
      lastName
      grade
      superior {
        id
        no
        firstName
        lastName
        grade
        superior {
          id
          no
          firstName
          lastName
          grade
          companyId
          createdAt
          updatedAt
        }
        companyId
        createdAt
        updatedAt
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
      }
      companyId
      createdAt
      updatedAt
      company {
        id
        name
        shortName
        url
        createdAt
        updatedAt
      }
    }
  }
`;
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployees(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        no
        firstName
        lastName
        grade
        superior {
          id
          no
          firstName
          lastName
          grade
          companyId
          createdAt
          updatedAt
        }
        companyId
        createdAt
        updatedAt
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getApprovalStatus = /* GraphQL */ `
  query GetApprovalStatus($id: ID!) {
    getApprovalStatus(id: $id) {
      id
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const listApprovalStatuss = /* GraphQL */ `
  query ListApprovalStatuss(
    $filter: ModelApprovalStatusFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listApprovalStatuss(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        no
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCompanys = /* GraphQL */ `
  query ListCompanys(
    $filter: ModelCompanyFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCompanys(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        shortName
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroups(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdOn
        updatedOn
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
        group {
          id
          name
          createdOn
          updatedOn
        }
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      name
      createdOn
      updatedOn
      company {
        id
        name
        shortName
        url
        createdAt
        updatedAt
      }
      group {
        id
        name
        createdOn
        updatedOn
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
        group {
          id
          name
          createdOn
          updatedOn
        }
      }
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
        no
        name
        createdOn
        updatedOn
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      no
      name
      createdOn
      updatedOn
      company {
        id
        name
        shortName
        url
        createdAt
        updatedAt
      }
    }
  }
`;
export const getInterview = /* GraphQL */ `
  query GetInterview($id: ID!) {
    getInterview(id: $id) {
      id
      sheetId
      interviewDate
      detail
      reviewee
      createdAt
      updatedOn
    }
  }
`;
export const listInterviews = /* GraphQL */ `
  query ListInterviews(
    $filter: ModelInterviewFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listInterviews(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sheetId
        interviewDate
        detail
        reviewee
        createdAt
        updatedOn
      }
      nextToken
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
        grade
        careerPlan
        careerPlanComment
        reviewComment
        reviewDate
        selfCheckDate
        firstComment
        firstCheckDate
        secondCheckDate
        overAllEvaluation
        companyId
        reviewee
        createdAt
        updatedOn
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
        group {
          id
          name
          createdOn
          updatedOn
        }
        interviews {
          nextToken
        }
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
      grade
      careerPlan
      careerPlanComment
      reviewComment
      reviewDate
      selfCheckDate
      firstComment
      firstCheckDate
      secondCheckDate
      overAllEvaluation
      companyId
      reviewee
      createdAt
      updatedOn
      company {
        id
        name
        shortName
        url
        createdAt
        updatedAt
      }
      group {
        id
        name
        createdOn
        updatedOn
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
        group {
          id
          name
          createdOn
          updatedOn
        }
      }
      interviews {
        items {
          id
          sheetId
          interviewDate
          detail
          reviewee
          createdAt
          updatedOn
        }
        nextToken
      }
    }
  }
`;
export const getObjective = /* GraphQL */ `
  query GetObjective($id: ID!) {
    getObjective(id: $id) {
      id
      status
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
      reviewee
      createdAt
      updatedOn
      category {
        id
        no
        name
        createdOn
        updatedOn
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
      }
      sheet {
        id
        year
        grade
        careerPlan
        careerPlanComment
        reviewComment
        reviewDate
        selfCheckDate
        firstComment
        firstCheckDate
        secondCheckDate
        overAllEvaluation
        companyId
        reviewee
        createdAt
        updatedOn
        company {
          id
          name
          shortName
          url
          createdAt
          updatedAt
        }
        group {
          id
          name
          createdOn
          updatedOn
        }
        interviews {
          nextToken
        }
      }
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
        status
        content
        result
        priority
        selfEvaluation
        firstEvaluation
        lastEvaluation
        reviewee
        createdAt
        updatedOn
        category {
          id
          no
          name
          createdOn
          updatedOn
        }
        sheet {
          id
          year
          grade
          careerPlan
          careerPlanComment
          reviewComment
          reviewDate
          selfCheckDate
          firstComment
          firstCheckDate
          secondCheckDate
          overAllEvaluation
          companyId
          reviewee
          createdAt
          updatedOn
        }
      }
      nextToken
    }
  }
`;
