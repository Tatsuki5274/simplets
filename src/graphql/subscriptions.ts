/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateApprovalStatus = /* GraphQL */ `
  subscription OnCreateApprovalStatus {
    onCreateApprovalStatus {
      id
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateApprovalStatus = /* GraphQL */ `
  subscription OnUpdateApprovalStatus {
    onUpdateApprovalStatus {
      id
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteApprovalStatus = /* GraphQL */ `
  subscription OnDeleteApprovalStatus {
    onDeleteApprovalStatus {
      id
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
      id
      name
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
      id
      name
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
      id
      name
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
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
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
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
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
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
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
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
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
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
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
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
export const onCreateInterview = /* GraphQL */ `
  subscription OnCreateInterview($reviewee: String) {
    onCreateInterview(reviewee: $reviewee) {
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
export const onUpdateInterview = /* GraphQL */ `
  subscription OnUpdateInterview($reviewee: String) {
    onUpdateInterview(reviewee: $reviewee) {
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
export const onDeleteInterview = /* GraphQL */ `
  subscription OnDeleteInterview($reviewee: String) {
    onDeleteInterview(reviewee: $reviewee) {
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
export const onCreateSheet = /* GraphQL */ `
  subscription OnCreateSheet($reviewee: String) {
    onCreateSheet(reviewee: $reviewee) {
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
export const onUpdateSheet = /* GraphQL */ `
  subscription OnUpdateSheet($reviewee: String) {
    onUpdateSheet(reviewee: $reviewee) {
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
export const onDeleteSheet = /* GraphQL */ `
  subscription OnDeleteSheet($reviewee: String) {
    onDeleteSheet(reviewee: $reviewee) {
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
export const onCreateObjective = /* GraphQL */ `
  subscription OnCreateObjective($reviewee: String) {
    onCreateObjective(reviewee: $reviewee) {
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
export const onUpdateObjective = /* GraphQL */ `
  subscription OnUpdateObjective($reviewee: String) {
    onUpdateObjective(reviewee: $reviewee) {
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
export const onDeleteObjective = /* GraphQL */ `
  subscription OnDeleteObjective($reviewee: String) {
    onDeleteObjective(reviewee: $reviewee) {
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
