/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const listEmployeesCompany = /* GraphQL */ `
  query ListEmployeesCompany(
    $companyID: ID
    $no: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelEmployeeFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmployeesCompany(
      companyID: $companyID
      no: $no
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        username
        companyID
        no
        groupID
        superiorUsername
        firstName
        lastName
        grade
        email
        sub
        manager
        isCompanyAdmin
        isDeleted
        createdAt
        updatedAt
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        superior {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listEmployeesManager = /* GraphQL */ `
  query ListEmployeesManager(
    $companyID: ID
    $managerIsDeleted: ModelEmployeeEmployeeByCompanyManagerCompositeKeyConditionInput
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
        username
        companyID
        no
        groupID
        superiorUsername
        firstName
        lastName
        grade
        email
        sub
        manager
        isCompanyAdmin
        isDeleted
        createdAt
        updatedAt
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        superior {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
      }
      nextToken
    }
  }
`;
export const listGroupsCompany = /* GraphQL */ `
  query ListGroupsCompany(
    $companyID: ID
    $no: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelGroupFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listGroupsCompany(
      companyID: $companyID
      no: $no
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        companyID
        no
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listCategorysCompany = /* GraphQL */ `
  query ListCategorysCompany(
    $companyID: ID
    $no: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelCategoryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCategorysCompany(
      companyID: $companyID
      no: $no
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        companyID
        no
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const listSheetsReviewee = /* GraphQL */ `
  query ListSheetsReviewee(
    $sub: String
    $year: ModelIntKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetsReviewee(
      sub: $sub
      year: $year
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sub
        year
        companyID
        groupID
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
        topUsername
        sheetGroupName
        referencer
        reviewee
        topReviewers
        secondReviewers
        createdAt
        updatedAt
        revieweeEmployee {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        secondEmployee {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        topEmployee {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
        section {
          items {
            id
            sheetID
            no
            sectionCategoryName
            reviewee
            topReviewers
            secondReviewers
            referencer
            createdAt
            updatedAt
            objective {
              items {
                id
                sectionID
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listSheetsCompany = /* GraphQL */ `
  query ListSheetsCompany(
    $companyID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelSheetFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSheetsCompany(
      companyID: $companyID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sub
        year
        companyID
        groupID
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
        topUsername
        sheetGroupName
        referencer
        reviewee
        topReviewers
        secondReviewers
        createdAt
        updatedAt
        revieweeEmployee {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        secondEmployee {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        topEmployee {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
        section {
          items {
            id
            sheetID
            no
            sectionCategoryName
            reviewee
            topReviewers
            secondReviewers
            referencer
            createdAt
            updatedAt
            objective {
              items {
                id
                sectionID
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
          nextToken
        }
      }
      nextToken
    }
  }
`;
export const listSectionsSheet = /* GraphQL */ `
  query ListSectionsSheet(
    $sheetID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSectionsSheet(
      sheetID: $sheetID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sheetID
        no
        sectionCategoryName
        reviewee
        topReviewers
        secondReviewers
        referencer
        createdAt
        updatedAt
        objective {
          items {
            id
            sectionID
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
      nextToken
    }
  }
`;
export const listObjectivesSection = /* GraphQL */ `
  query ListObjectivesSection(
    $sectionID: ID
    $sortDirection: ModelSortDirection
    $filter: ModelObjectiveFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listObjectivesSection(
      sectionID: $sectionID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sectionID
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
export const listReportsSub = /* GraphQL */ `
  query ListReportsSub(
    $sub: String
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportsSub(
      sub: $sub
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sub
        date
        reviewee
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
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
      }
      nextToken
    }
  }
`;
export const listReportsReviewee = /* GraphQL */ `
  query ListReportsReviewee(
    $reviewee: String
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportsReviewee(
      reviewee: $reviewee
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sub
        date
        reviewee
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
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
      }
      nextToken
    }
  }
`;
export const listReportsCompanyDate = /* GraphQL */ `
  query ListReportsCompanyDate(
    $companyID: String
    $date: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelReportFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listReportsCompanyDate(
      companyID: $companyID
      date: $date
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        sub
        date
        reviewee
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
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
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
      startMonth
      shortName
      url
      createdAt
      updatedAt
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($username: String!) {
    getEmployee(username: $username) {
      username
      companyID
      no
      groupID
      superiorUsername
      firstName
      lastName
      grade
      email
      sub
      manager
      isCompanyAdmin
      isDeleted
      createdAt
      updatedAt
      company {
        id
        name
        startMonth
        shortName
        url
        createdAt
        updatedAt
      }
      superior {
        username
        companyID
        no
        groupID
        superiorUsername
        firstName
        lastName
        grade
        email
        sub
        manager
        isCompanyAdmin
        isDeleted
        createdAt
        updatedAt
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        superior {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
      }
      group {
        id
        companyID
        no
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const getGroup = /* GraphQL */ `
  query GetGroup($id: ID!) {
    getGroup(id: $id) {
      id
      companyID
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      companyID
      no
      name
      createdAt
      updatedAt
    }
  }
`;
export const getSheet = /* GraphQL */ `
  query GetSheet($id: ID!) {
    getSheet(id: $id) {
      id
      sub
      year
      companyID
      groupID
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
      topUsername
      sheetGroupName
      referencer
      reviewee
      topReviewers
      secondReviewers
      createdAt
      updatedAt
      revieweeEmployee {
        username
        companyID
        no
        groupID
        superiorUsername
        firstName
        lastName
        grade
        email
        sub
        manager
        isCompanyAdmin
        isDeleted
        createdAt
        updatedAt
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        superior {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
      }
      secondEmployee {
        username
        companyID
        no
        groupID
        superiorUsername
        firstName
        lastName
        grade
        email
        sub
        manager
        isCompanyAdmin
        isDeleted
        createdAt
        updatedAt
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        superior {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
      }
      topEmployee {
        username
        companyID
        no
        groupID
        superiorUsername
        firstName
        lastName
        grade
        email
        sub
        manager
        isCompanyAdmin
        isDeleted
        createdAt
        updatedAt
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        superior {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
      }
      group {
        id
        companyID
        no
        name
        createdAt
        updatedAt
      }
      section {
        items {
          id
          sheetID
          no
          sectionCategoryName
          reviewee
          topReviewers
          secondReviewers
          referencer
          createdAt
          updatedAt
          objective {
            items {
              id
              sectionID
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
        nextToken
      }
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      sheetID
      no
      sectionCategoryName
      reviewee
      topReviewers
      secondReviewers
      referencer
      createdAt
      updatedAt
      objective {
        items {
          id
          sectionID
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
  }
`;
export const getObjective = /* GraphQL */ `
  query GetObjective($id: ID!) {
    getObjective(id: $id) {
      id
      sectionID
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
export const getReport = /* GraphQL */ `
  query GetReport($id: ID!) {
    getReport(id: $id) {
      id
      sub
      date
      reviewee
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
        username
        companyID
        no
        groupID
        superiorUsername
        firstName
        lastName
        grade
        email
        sub
        manager
        isCompanyAdmin
        isDeleted
        createdAt
        updatedAt
        company {
          id
          name
          startMonth
          shortName
          url
          createdAt
          updatedAt
        }
        superior {
          username
          companyID
          no
          groupID
          superiorUsername
          firstName
          lastName
          grade
          email
          sub
          manager
          isCompanyAdmin
          isDeleted
          createdAt
          updatedAt
          company {
            id
            name
            startMonth
            shortName
            url
            createdAt
            updatedAt
          }
          superior {
            username
            companyID
            no
            groupID
            superiorUsername
            firstName
            lastName
            grade
            email
            sub
            manager
            isCompanyAdmin
            isDeleted
            createdAt
            updatedAt
            company {
              id
              name
              startMonth
              shortName
              url
              createdAt
              updatedAt
            }
            superior {
              username
              companyID
              no
              groupID
              superiorUsername
              firstName
              lastName
              grade
              email
              sub
              manager
              isCompanyAdmin
              isDeleted
              createdAt
              updatedAt
              company {
                id
                name
                startMonth
                shortName
                url
                createdAt
                updatedAt
              }
              superior {
                username
                companyID
                no
                groupID
                superiorUsername
                firstName
                lastName
                grade
                email
                sub
                manager
                isCompanyAdmin
                isDeleted
                createdAt
                updatedAt
                company {
                  id
                  name
                  startMonth
                  shortName
                  url
                  createdAt
                  updatedAt
                }
                superior {
                  username
                  companyID
                  no
                  groupID
                  superiorUsername
                  firstName
                  lastName
                  grade
                  email
                  sub
                  manager
                  isCompanyAdmin
                  isDeleted
                  createdAt
                  updatedAt
                }
                group {
                  id
                  companyID
                  no
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                id
                companyID
                no
                name
                createdAt
                updatedAt
              }
            }
            group {
              id
              companyID
              no
              name
              createdAt
              updatedAt
            }
          }
          group {
            id
            companyID
            no
            name
            createdAt
            updatedAt
          }
        }
        group {
          id
          companyID
          no
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
