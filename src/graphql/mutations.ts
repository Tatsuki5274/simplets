/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const approvalStatusManager = /* GraphQL */ `
  mutation ApprovalStatusManager($action: String, $sheetId: String) {
    approvalStatusManager(action: $action, sheetId: $sheetId)
  }
`;
export const sendEmail = /* GraphQL */ `
  mutation SendEmail($input: sendEmailInput) {
    sendEmail(input: $input)
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
      startMonth
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
      startMonth
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
      startMonth
      shortName
      url
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
      companyID
      username
      localID
      employeeGroupLocalId
      superiorUsername
      firstName
      lastName
      grade
      email
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      company {
        id
        name
        startMonth
        shortName
        url
        createdAt
        updatedAt
      }
      manager
      isDeleted
      createdAt
      updatedAt
      superior {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
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
      companyID
      username
      localID
      employeeGroupLocalId
      superiorUsername
      firstName
      lastName
      grade
      email
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      company {
        id
        name
        startMonth
        shortName
        url
        createdAt
        updatedAt
      }
      manager
      isDeleted
      createdAt
      updatedAt
      superior {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
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
      companyID
      username
      localID
      employeeGroupLocalId
      superiorUsername
      firstName
      lastName
      grade
      email
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      company {
        id
        name
        startMonth
        shortName
        url
        createdAt
        updatedAt
      }
      manager
      isDeleted
      createdAt
      updatedAt
      superior {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
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
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateGroup = /* GraphQL */ `
  mutation UpdateGroup(
    $input: UpdateGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    updateGroup(input: $input, condition: $condition) {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteGroup = /* GraphQL */ `
  mutation DeleteGroup(
    $input: DeleteGroupInput!
    $condition: ModelGroupConditionInput
  ) {
    deleteGroup(input: $input, condition: $condition) {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const createCategory = /* GraphQL */ `
  mutation CreateCategory(
    $input: CreateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    createCategory(input: $input, condition: $condition) {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateCategory = /* GraphQL */ `
  mutation UpdateCategory(
    $input: UpdateCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    updateCategory(input: $input, condition: $condition) {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteCategory = /* GraphQL */ `
  mutation DeleteCategory(
    $input: DeleteCategoryInput!
    $condition: ModelCategoryConditionInput
  ) {
    deleteCategory(input: $input, condition: $condition) {
      companyID
      localID
      name
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
      companyID
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
      statusValue
      interviewPlanDate
      interviewPlanComment
      InterviewMid1Date
      InterviewMid1Comment
      InterviewMid2Date
      InterviewMid2Comment
      InterviewMid3Date
      InterviewMid3Comment
      revieweeUsername
      secondUsername
      sheetGroupLocalId
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      referencer
      reviewee
      topReviewers
      secondReviewers
      createdAt
      updatedAt
      revieweeEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
      secondEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
      section {
        items {
          sheetKeys
          sectionCategoryLocalId
          sectionCategoryName
          companyID
          objective {
            items {
              sectionKeys
              createdAt
              companyID
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
              progress
              expStartDate
              expDoneDate
              reviewee
              topReviewers
              secondReviewers
              referencer
              updatedAt
            }
            nextToken
          }
          reviewee
          topReviewers
          secondReviewers
          referencer
          createdAt
          updatedAt
          category {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const deleteSheet = /* GraphQL */ `
  mutation DeleteSheet(
    $input: DeleteSheetInput!
    $condition: ModelSheetConditionInput
  ) {
    deleteSheet(input: $input, condition: $condition) {
      companyID
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
      statusValue
      interviewPlanDate
      interviewPlanComment
      InterviewMid1Date
      InterviewMid1Comment
      InterviewMid2Date
      InterviewMid2Comment
      InterviewMid3Date
      InterviewMid3Comment
      revieweeUsername
      secondUsername
      sheetGroupLocalId
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      referencer
      reviewee
      topReviewers
      secondReviewers
      createdAt
      updatedAt
      revieweeEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
      secondEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
      section {
        items {
          sheetKeys
          sectionCategoryLocalId
          sectionCategoryName
          companyID
          objective {
            items {
              sectionKeys
              createdAt
              companyID
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
              progress
              expStartDate
              expDoneDate
              reviewee
              topReviewers
              secondReviewers
              referencer
              updatedAt
            }
            nextToken
          }
          reviewee
          topReviewers
          secondReviewers
          referencer
          createdAt
          updatedAt
          category {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const createSection = /* GraphQL */ `
  mutation CreateSection(
    $input: CreateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    createSection(input: $input, condition: $condition) {
      sheetKeys
      sectionCategoryLocalId
      sectionCategoryName
      companyID
      objective {
        items {
          sectionKeys
          createdAt
          companyID
          content
          result
          priority
          selfEvaluation
          firstEvaluation
          lastEvaluation
          progress
          expStartDate
          expDoneDate
          reviewee
          topReviewers
          secondReviewers
          referencer
          updatedAt
        }
        nextToken
      }
      reviewee
      topReviewers
      secondReviewers
      referencer
      createdAt
      updatedAt
      category {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const deleteSection = /* GraphQL */ `
  mutation DeleteSection(
    $input: DeleteSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    deleteSection(input: $input, condition: $condition) {
      sheetKeys
      sectionCategoryLocalId
      sectionCategoryName
      companyID
      objective {
        items {
          sectionKeys
          createdAt
          companyID
          content
          result
          priority
          selfEvaluation
          firstEvaluation
          lastEvaluation
          progress
          expStartDate
          expDoneDate
          reviewee
          topReviewers
          secondReviewers
          referencer
          updatedAt
        }
        nextToken
      }
      reviewee
      topReviewers
      secondReviewers
      referencer
      createdAt
      updatedAt
      category {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const createObjective = /* GraphQL */ `
  mutation CreateObjective(
    $input: CreateObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    createObjective(input: $input, condition: $condition) {
      sectionKeys
      createdAt
      companyID
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
      progress
      expStartDate
      expDoneDate
      reviewee
      topReviewers
      secondReviewers
      referencer
      updatedAt
    }
  }
`;
export const updateObjective = /* GraphQL */ `
  mutation UpdateObjective(
    $input: UpdateObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    updateObjective(input: $input, condition: $condition) {
      sectionKeys
      createdAt
      companyID
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
      progress
      expStartDate
      expDoneDate
      reviewee
      topReviewers
      secondReviewers
      referencer
      updatedAt
    }
  }
`;
export const deleteObjective = /* GraphQL */ `
  mutation DeleteObjective(
    $input: DeleteObjectiveInput!
    $condition: ModelObjectiveConditionInput
  ) {
    deleteObjective(input: $input, condition: $condition) {
      sectionKeys
      createdAt
      companyID
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
      progress
      expStartDate
      expDoneDate
      reviewee
      topReviewers
      secondReviewers
      referencer
      updatedAt
    }
  }
`;
export const createReport = /* GraphQL */ `
  mutation CreateReport(
    $input: CreateReportInput!
    $condition: ModelReportConditionInput
  ) {
    createReport(input: $input, condition: $condition) {
      reviewee
      date
      reviewer
      companyID
      referencer
      revieweeComments {
        work
        other
        status
      }
      reviewerComments {
        superior
      }
      workStatus
      createdAt
      updatedAt
      revieweeEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const updateReport = /* GraphQL */ `
  mutation UpdateReport(
    $input: UpdateReportInput!
    $condition: ModelReportConditionInput
  ) {
    updateReport(input: $input, condition: $condition) {
      reviewee
      date
      reviewer
      companyID
      referencer
      revieweeComments {
        work
        other
        status
      }
      reviewerComments {
        superior
      }
      workStatus
      createdAt
      updatedAt
      revieweeEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const deleteReport = /* GraphQL */ `
  mutation DeleteReport(
    $input: DeleteReportInput!
    $condition: ModelReportConditionInput
  ) {
    deleteReport(input: $input, condition: $condition) {
      reviewee
      date
      reviewer
      companyID
      referencer
      revieweeComments {
        work
        other
        status
      }
      reviewerComments {
        superior
      }
      workStatus
      createdAt
      updatedAt
      revieweeEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
    }
  }
`;
export const updateSheet = /* GraphQL */ `
  mutation UpdateSheet(
    $input: UpdateSheetInput!
    $condition: ModelSheetConditionInput
  ) {
    updateSheet(input: $input, condition: $condition) {
      companyID
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
      statusValue
      interviewPlanDate
      interviewPlanComment
      InterviewMid1Date
      InterviewMid1Comment
      InterviewMid2Date
      InterviewMid2Comment
      InterviewMid3Date
      InterviewMid3Comment
      revieweeUsername
      secondUsername
      sheetGroupLocalId
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      referencer
      reviewee
      topReviewers
      secondReviewers
      createdAt
      updatedAt
      revieweeEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
      secondEmployee {
        companyID
        username
        localID
        employeeGroupLocalId
        superiorUsername
        firstName
        lastName
        grade
        email
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        manager
        isDeleted
        createdAt
        updatedAt
        superior {
          companyID
          username
          localID
          employeeGroupLocalId
          superiorUsername
          firstName
          lastName
          grade
          email
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          manager
          isDeleted
          createdAt
          updatedAt
          superior {
            companyID
            username
            localID
            employeeGroupLocalId
            superiorUsername
            firstName
            lastName
            grade
            email
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            manager
            isDeleted
            createdAt
            updatedAt
            superior {
              companyID
              username
              localID
              employeeGroupLocalId
              superiorUsername
              firstName
              lastName
              grade
              email
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              manager
              isDeleted
              createdAt
              updatedAt
              superior {
                companyID
                username
                localID
                employeeGroupLocalId
                superiorUsername
                firstName
                lastName
                grade
                email
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                manager
                isDeleted
                createdAt
                updatedAt
                superior {
                  companyID
                  username
                  localID
                  employeeGroupLocalId
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  manager
                  isDeleted
                  createdAt
                  updatedAt
                }
              }
            }
          }
        }
      }
      section {
        items {
          sheetKeys
          sectionCategoryLocalId
          sectionCategoryName
          companyID
          objective {
            items {
              sectionKeys
              createdAt
              companyID
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
              progress
              expStartDate
              expDoneDate
              reviewee
              topReviewers
              secondReviewers
              referencer
              updatedAt
            }
            nextToken
          }
          reviewee
          topReviewers
          secondReviewers
          referencer
          createdAt
          updatedAt
          category {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        nextToken
      }
    }
  }
`;
export const updateSection = /* GraphQL */ `
  mutation UpdateSection(
    $input: UpdateSectionInput!
    $condition: ModelSectionConditionInput
  ) {
    updateSection(input: $input, condition: $condition) {
      sheetKeys
      sectionCategoryLocalId
      sectionCategoryName
      companyID
      objective {
        items {
          sectionKeys
          createdAt
          companyID
          content
          result
          priority
          selfEvaluation
          firstEvaluation
          lastEvaluation
          progress
          expStartDate
          expDoneDate
          reviewee
          topReviewers
          secondReviewers
          referencer
          updatedAt
        }
        nextToken
      }
      reviewee
      topReviewers
      secondReviewers
      referencer
      createdAt
      updatedAt
      category {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
    }
  }
`;
