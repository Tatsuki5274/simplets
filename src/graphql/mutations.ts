/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const approvalStatusManager = /* GraphQL */ `
  mutation ApprovalStatusManager($action: String, $sheetId: String) {
    approvalStatusManager(action: $action, sheetId: $sheetId)
  }
`;
export const createApprovalStatus = /* GraphQL */ `
  mutation CreateApprovalStatus(
    $input: CreateApprovalStatusInput!
    $condition: ModelApprovalStatusConditionInput
  ) {
    createApprovalStatus(input: $input, condition: $condition) {
      id
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateApprovalStatus = /* GraphQL */ `
  mutation UpdateApprovalStatus(
    $input: UpdateApprovalStatusInput!
    $condition: ModelApprovalStatusConditionInput
  ) {
    updateApprovalStatus(input: $input, condition: $condition) {
      id
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteApprovalStatus = /* GraphQL */ `
  mutation DeleteApprovalStatus(
    $input: DeleteApprovalStatusInput!
    $condition: ModelApprovalStatusConditionInput
  ) {
    deleteApprovalStatus(input: $input, condition: $condition) {
      id
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const createEmployee = /* GraphQL */ `
  mutation CreateEmployee(
    $input: CreateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    createEmployee(input: $input, condition: $condition) {
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
export const updateEmployee = /* GraphQL */ `
  mutation UpdateEmployee(
    $input: UpdateEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    updateEmployee(input: $input, condition: $condition) {
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
export const deleteEmployee = /* GraphQL */ `
  mutation DeleteEmployee(
    $input: DeleteEmployeeInput!
    $condition: ModelEmployeeConditionInput
  ) {
    deleteEmployee(input: $input, condition: $condition) {
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
export const createGroup = /* GraphQL */ `
  mutation CreateGroup(
    $input: CreateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    createGroup(input: $input, condition: $condition) {
      id
      group {
        id
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      id
      group {
        id
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      id
      group {
        id
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
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
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
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
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
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
export const createInterview = /* GraphQL */ `
  mutation CreateInterview(
    $input: CreateInterviewInput!
    $condition: ModelInterviewConditionInput
  ) {
    createInterview(input: $input, condition: $condition) {
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
export const updateInterview = /* GraphQL */ `
  mutation UpdateInterview(
    $input: UpdateInterviewInput!
    $condition: ModelInterviewConditionInput
  ) {
    updateInterview(input: $input, condition: $condition) {
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
export const deleteInterview = /* GraphQL */ `
  mutation DeleteInterview(
    $input: DeleteInterviewInput!
    $condition: ModelInterviewConditionInput
  ) {
    deleteInterview(input: $input, condition: $condition) {
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
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
      id
      sectionSheetId
      objective {
        items {
          id
          status
          content
          result
          priority
          selfEvaluation
          firstEvaluation
          lastEvaluation
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
            secondComment
            secondCheckDate
            overAllEvaluation
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
            secondEmployee {
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
            section {
              items {
                id
                sectionSheetId
                objective {
                  nextToken
                }
                category {
                  id
                  no
                  name
                  createdOn
                  updatedOn
                }
                createdAt
                updatedOn
              }
              nextToken
            }
            status
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
            statusValue
          }
          objectiveSectionId
          section {
            id
            sectionSheetId
            objective {
              items {
                id
                status
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
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
                  secondComment
                  secondCheckDate
                  overAllEvaluation
                  status
                  reviewee
                  createdAt
                  updatedOn
                  statusValue
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                reviewee
                createdAt
                updatedOn
              }
              nextToken
            }
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
            createdAt
            updatedOn
          }
          reviewee
          createdAt
          updatedOn
        }
        nextToken
      }
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
      createdAt
      updatedOn
    }
  }
`;
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
      id
      sectionSheetId
      objective {
        items {
          id
          status
          content
          result
          priority
          selfEvaluation
          firstEvaluation
          lastEvaluation
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
            secondComment
            secondCheckDate
            overAllEvaluation
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
            secondEmployee {
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
            section {
              items {
                id
                sectionSheetId
                objective {
                  nextToken
                }
                category {
                  id
                  no
                  name
                  createdOn
                  updatedOn
                }
                createdAt
                updatedOn
              }
              nextToken
            }
            status
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
            statusValue
          }
          objectiveSectionId
          section {
            id
            sectionSheetId
            objective {
              items {
                id
                status
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
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
                  secondComment
                  secondCheckDate
                  overAllEvaluation
                  status
                  reviewee
                  createdAt
                  updatedOn
                  statusValue
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                reviewee
                createdAt
                updatedOn
              }
              nextToken
            }
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
            createdAt
            updatedOn
          }
          reviewee
          createdAt
          updatedOn
        }
        nextToken
      }
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
      createdAt
      updatedOn
    }
  }
`;
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
      id
      sectionSheetId
      objective {
        items {
          id
          status
          content
          result
          priority
          selfEvaluation
          firstEvaluation
          lastEvaluation
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
            secondComment
            secondCheckDate
            overAllEvaluation
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
            secondEmployee {
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
            section {
              items {
                id
                sectionSheetId
                objective {
                  nextToken
                }
                category {
                  id
                  no
                  name
                  createdOn
                  updatedOn
                }
                createdAt
                updatedOn
              }
              nextToken
            }
            status
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
            statusValue
          }
          objectiveSectionId
          section {
            id
            sectionSheetId
            objective {
              items {
                id
                status
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
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
                  secondComment
                  secondCheckDate
                  overAllEvaluation
                  status
                  reviewee
                  createdAt
                  updatedOn
                  statusValue
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                reviewee
                createdAt
                updatedOn
              }
              nextToken
            }
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
            createdAt
            updatedOn
          }
          reviewee
          createdAt
          updatedOn
        }
        nextToken
      }
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
      createdAt
      updatedOn
    }
  }
`;
export const createObjective = /* GraphQL */ `
  mutation CreateObjective(
    $input: CreateObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    createObjective(input: $input, condition: $condition) {
      id
      status
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
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
        secondComment
        secondCheckDate
        overAllEvaluation
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
        secondEmployee {
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
        section {
          items {
            id
            sectionSheetId
            objective {
              items {
                id
                status
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
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
                  secondComment
                  secondCheckDate
                  overAllEvaluation
                  status
                  reviewee
                  createdAt
                  updatedOn
                  statusValue
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                reviewee
                createdAt
                updatedOn
              }
              nextToken
            }
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
            createdAt
            updatedOn
          }
          nextToken
        }
        status
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
        statusValue
      }
      objectiveSectionId
      section {
        id
        sectionSheetId
        objective {
          items {
            id
            status
            content
            result
            priority
            selfEvaluation
            firstEvaluation
            lastEvaluation
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
              secondComment
              secondCheckDate
              overAllEvaluation
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
              secondEmployee {
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
              section {
                items {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                nextToken
              }
              status
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
              statusValue
            }
            objectiveSectionId
            section {
              id
              sectionSheetId
              objective {
                items {
                  id
                  status
                  content
                  result
                  priority
                  selfEvaluation
                  firstEvaluation
                  lastEvaluation
                  objectiveSectionId
                  reviewee
                  createdAt
                  updatedOn
                }
                nextToken
              }
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
              createdAt
              updatedOn
            }
            reviewee
            createdAt
            updatedOn
          }
          nextToken
        }
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
        createdAt
        updatedOn
      }
      reviewee
      createdAt
      updatedOn
    }
  }
`;
export const updateObjective = /* GraphQL */ `
  mutation UpdateObjective(
    $input: UpdateObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    updateObjective(input: $input, condition: $condition) {
      id
      status
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
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
        secondComment
        secondCheckDate
        overAllEvaluation
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
        secondEmployee {
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
        section {
          items {
            id
            sectionSheetId
            objective {
              items {
                id
                status
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
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
                  secondComment
                  secondCheckDate
                  overAllEvaluation
                  status
                  reviewee
                  createdAt
                  updatedOn
                  statusValue
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                reviewee
                createdAt
                updatedOn
              }
              nextToken
            }
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
            createdAt
            updatedOn
          }
          nextToken
        }
        status
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
        statusValue
      }
      objectiveSectionId
      section {
        id
        sectionSheetId
        objective {
          items {
            id
            status
            content
            result
            priority
            selfEvaluation
            firstEvaluation
            lastEvaluation
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
              secondComment
              secondCheckDate
              overAllEvaluation
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
              secondEmployee {
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
              section {
                items {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                nextToken
              }
              status
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
              statusValue
            }
            objectiveSectionId
            section {
              id
              sectionSheetId
              objective {
                items {
                  id
                  status
                  content
                  result
                  priority
                  selfEvaluation
                  firstEvaluation
                  lastEvaluation
                  objectiveSectionId
                  reviewee
                  createdAt
                  updatedOn
                }
                nextToken
              }
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
              createdAt
              updatedOn
            }
            reviewee
            createdAt
            updatedOn
          }
          nextToken
        }
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
        createdAt
        updatedOn
      }
      reviewee
      createdAt
      updatedOn
    }
  }
`;
export const deleteObjective = /* GraphQL */ `
  mutation DeleteObjective(
    $input: DeleteObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    deleteObjective(input: $input, condition: $condition) {
      id
      status
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
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
        secondComment
        secondCheckDate
        overAllEvaluation
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
        secondEmployee {
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
        section {
          items {
            id
            sectionSheetId
            objective {
              items {
                id
                status
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
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
                  secondComment
                  secondCheckDate
                  overAllEvaluation
                  status
                  reviewee
                  createdAt
                  updatedOn
                  statusValue
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                reviewee
                createdAt
                updatedOn
              }
              nextToken
            }
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
            createdAt
            updatedOn
          }
          nextToken
        }
        status
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
        statusValue
      }
      objectiveSectionId
      section {
        id
        sectionSheetId
        objective {
          items {
            id
            status
            content
            result
            priority
            selfEvaluation
            firstEvaluation
            lastEvaluation
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
              secondComment
              secondCheckDate
              overAllEvaluation
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
              secondEmployee {
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
              section {
                items {
                  id
                  sectionSheetId
                  createdAt
                  updatedOn
                }
                nextToken
              }
              status
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
              statusValue
            }
            objectiveSectionId
            section {
              id
              sectionSheetId
              objective {
                items {
                  id
                  status
                  content
                  result
                  priority
                  selfEvaluation
                  firstEvaluation
                  lastEvaluation
                  objectiveSectionId
                  reviewee
                  createdAt
                  updatedOn
                }
                nextToken
              }
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
              createdAt
              updatedOn
            }
            reviewee
            createdAt
            updatedOn
          }
          nextToken
        }
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
        createdAt
        updatedOn
      }
      reviewee
      createdAt
      updatedOn
    }
  }
`;
export const createCompany = /* GraphQL */ `
  mutation CreateCompany(
    $input: CreateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    createCompany(input: $input, condition: $condition) {
      id
      name
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const updateCompany = /* GraphQL */ `
  mutation UpdateCompany(
    $input: UpdateCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    updateCompany(input: $input, condition: $condition) {
      id
      name
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const deleteCompany = /* GraphQL */ `
  mutation DeleteCompany(
    $input: DeleteCompanyInput!
    $condition: ModelCompanyConditionInput
  ) {
    deleteCompany(input: $input, condition: $condition) {
      id
      name
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const createSheet = /* GraphQL */ `
  mutation CreateSheet(
    $input: CreateSheetInput!
    $condition: ModelSheetConditionInput
  ) {
    createSheet(input: $input, condition: $condition) {
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
      secondComment
      secondCheckDate
      overAllEvaluation
      group {
        id
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
      secondEmployee {
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
      section {
        items {
          id
          sectionSheetId
          objective {
            items {
              id
              status
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
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
                secondComment
                secondCheckDate
                overAllEvaluation
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
                interviews {
                  nextToken
                }
                secondEmployee {
                  id
                  no
                  firstName
                  lastName
                  grade
                  companyId
                  createdAt
                  updatedAt
                }
                section {
                  nextToken
                }
                status
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
                statusValue
              }
              objectiveSectionId
              section {
                id
                sectionSheetId
                objective {
                  nextToken
                }
                category {
                  id
                  no
                  name
                  createdOn
                  updatedOn
                }
                createdAt
                updatedOn
              }
              reviewee
              createdAt
              updatedOn
            }
            nextToken
          }
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
          createdAt
          updatedOn
        }
        nextToken
      }
      status
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
      statusValue
    }
  }
`;
export const updateSheet = /* GraphQL */ `
  mutation UpdateSheet(
    $input: UpdateSheetInput!
    $condition: ModelSheetConditionInput
  ) {
    updateSheet(input: $input, condition: $condition) {
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
      secondComment
      secondCheckDate
      overAllEvaluation
      group {
        id
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
      secondEmployee {
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
      section {
        items {
          id
          sectionSheetId
          objective {
            items {
              id
              status
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
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
                secondComment
                secondCheckDate
                overAllEvaluation
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
                interviews {
                  nextToken
                }
                secondEmployee {
                  id
                  no
                  firstName
                  lastName
                  grade
                  companyId
                  createdAt
                  updatedAt
                }
                section {
                  nextToken
                }
                status
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
                statusValue
              }
              objectiveSectionId
              section {
                id
                sectionSheetId
                objective {
                  nextToken
                }
                category {
                  id
                  no
                  name
                  createdOn
                  updatedOn
                }
                createdAt
                updatedOn
              }
              reviewee
              createdAt
              updatedOn
            }
            nextToken
          }
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
          createdAt
          updatedOn
        }
        nextToken
      }
      status
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
      statusValue
    }
  }
`;
export const deleteSheet = /* GraphQL */ `
  mutation DeleteSheet(
    $input: DeleteSheetInput!
    $condition: ModelSheetConditionInput
  ) {
    deleteSheet(input: $input, condition: $condition) {
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
      secondComment
      secondCheckDate
      overAllEvaluation
      group {
        id
        group {
          id
          group {
            id
            group {
              id
              group {
                id
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
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
      secondEmployee {
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
      section {
        items {
          id
          sectionSheetId
          objective {
            items {
              id
              status
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
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
                secondComment
                secondCheckDate
                overAllEvaluation
                group {
                  id
                  name
                  createdOn
                  updatedOn
                }
                interviews {
                  nextToken
                }
                secondEmployee {
                  id
                  no
                  firstName
                  lastName
                  grade
                  companyId
                  createdAt
                  updatedAt
                }
                section {
                  nextToken
                }
                status
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
                statusValue
              }
              objectiveSectionId
              section {
                id
                sectionSheetId
                objective {
                  nextToken
                }
                category {
                  id
                  no
                  name
                  createdOn
                  updatedOn
                }
                createdAt
                updatedOn
              }
              reviewee
              createdAt
              updatedOn
            }
            nextToken
          }
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
          createdAt
          updatedOn
        }
        nextToken
      }
      status
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
      statusValue
    }
  }
`;
