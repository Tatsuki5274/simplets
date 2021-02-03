/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
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
        startMonth
        shortName
        url
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($companyID: ID!, $localID: ID!) {
    getGroup(companyID: $companyID, localID: $localID) {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const listGroups = /* GraphQL */ `
  query ListGroups(
    $companyID: ID
    $localID: ModelIDKeyConditionInput
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listGroups(
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
export const getCategory = /* GraphQL */ `
  query GetCategory($companyID: ID!, $localID: ID!) {
    getCategory(companyID: $companyID, localID: $localID) {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const listCategorys = /* GraphQL */ `
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
export const getObjective = /* GraphQL */ `
  query GetObjective($sectionKeys: ID!, $createdAt: AWSDateTime!) {
    getObjective(sectionKeys: $sectionKeys, createdAt: $createdAt) {
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
export const listObjectives = /* GraphQL */ `
  query ListObjectives(
    $sectionKeys: ID
    $createdAt: ModelStringKeyConditionInput
    $filter: ModelObjectiveFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listObjectives(
      sectionKeys: $sectionKeys
      createdAt: $createdAt
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
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
  }
`;
export const listEmployees = /* GraphQL */ `
  query ListEmployees(
    $companyID: ID
    $username: ModelIDKeyConditionInput
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listEmployees(
      companyID: $companyID
      username: $username
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($companyID: ID!, $username: ID!) {
    getEmployee(companyID: $companyID, username: $username) {
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
export const listEmployeeLocalId = /* GraphQL */ `
  query ListEmployeeLocalId(
    $companyID: ID
    $localID: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployeeLocalID(
      companyID: $companyID
      localID: $localID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const listEmployeesManager = /* GraphQL */ `
  query ListEmployeesManager(
    $companyID: ID
    $managerIsDeleted: ModelEmployeeEmployee_managerCompositeKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployeesManager(
      companyID: $companyID
      managerIsDeleted: $managerIsDeleted
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getSheet = /* GraphQL */ `
  query GetSheet($companyID: ID!, $reviewee: String!, $year: Int!) {
    getSheet(companyID: $companyID, reviewee: $reviewee, year: $year) {
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
        }
        nextToken
      }
    }
  }
`;
export const listSheets = /* GraphQL */ `
  query ListSheets(
    $companyID: ID
    $revieweeYear: ModelSheetPrimaryCompositeKeyConditionInput
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listSheets(
      companyID: $companyID
      revieweeYear: $revieweeYear
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listSheetReviewee = /* GraphQL */ `
  query ListSheetReviewee(
    $companyID: ID
    $reviewee: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetReviewee(
      companyID: $companyID
      reviewee: $reviewee
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listSheetYear = /* GraphQL */ `
  query ListSheetYear(
    $companyID: ID
    $year: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetYear(
      companyID: $companyID
      year: $year
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listSheetGroup = /* GraphQL */ `
  query ListSheetGroup(
    $companyID: ID
    $sheetGroupLocalId: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetGroup(
      companyID: $companyID
      sheetGroupLocalId: $sheetGroupLocalId
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
                  manager
                  isDeleted
                  createdAt
                  updatedAt
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
          }
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($sheetKeys: ID!, $sectionCategoryLocalId: ID!) {
    getSection(
      sheetKeys: $sheetKeys
      sectionCategoryLocalId: $sectionCategoryLocalId
    ) {
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
    }
  }
`;
export const listSections = /* GraphQL */ `
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
      }
      nextToken
    }
  }
`;
