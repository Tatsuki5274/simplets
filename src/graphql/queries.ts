/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCompany = /* GraphQL */ `
  query GetCompany($id: ID!) {
    getCompany(id: $id) {
      id
      name
      shortName
      url
      companyReadGroup
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
        shortName
        url
        companyReadGroup
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getEmployee = /* GraphQL */ `
  query GetEmployee($id: ID!) {
    getEmployee(id: $id) {
      id
      no
      firstName
      lastName
      grade
      email
      superior {
        id
        no
        firstName
        lastName
        grade
        email
        superior {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        group {
          id
          name
          sort
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        company {
          id
          name
          shortName
          url
          companyReadGroup
          createdAt
          updatedAt
        }
        companyReadGroup
        createdAt
        updatedAt
      }
      group {
        id
        name
        sort
        companyReadGroup
        companyAdminGroup
        createdAt
        updatedAt
      }
      company {
        id
        name
        shortName
        url
        companyReadGroup
        createdAt
        updatedAt
      }
      companyReadGroup
      createdAt
      updatedAt
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
        email
        superior {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        group {
          id
          name
          sort
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        company {
          id
          name
          shortName
          url
          companyReadGroup
          createdAt
          updatedAt
        }
        companyReadGroup
        createdAt
        updatedAt
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
      sort
      companyReadGroup
      companyAdminGroup
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
        sort
        companyReadGroup
        companyAdminGroup
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getCategory = /* GraphQL */ `
  query GetCategory($id: ID!) {
    getCategory(id: $id) {
      id
      company {
        id
        name
        shortName
        url
        companyReadGroup
        createdAt
        updatedAt
      }
      no
      name
      companyReadGroup
      companyAdminGroup
      createdAt
      updatedAt
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
        company {
          id
          name
          shortName
          url
          companyReadGroup
          createdAt
          updatedAt
        }
        no
        name
        companyReadGroup
        companyAdminGroup
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getInterview = /* GraphQL */ `
  query GetInterview($id: ID!) {
    getInterview(id: $id) {
      id
      sheetId
      interviewDate
      purpose
      detail
      reviewee
      reviewers
      createdAt
      updatedAt
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
        purpose
        detail
        reviewee
        reviewers
        createdAt
        updatedAt
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
      secondComment
      secondCheckDate
      overAllEvaluation
      statusValue
      sheetGroupId
      group {
        id
        name
        sort
        companyReadGroup
        companyAdminGroup
        createdAt
        updatedAt
      }
      interviews {
        items {
          id
          sheetId
          interviewDate
          purpose
          detail
          reviewee
          reviewers
          createdAt
          updatedAt
        }
        nextToken
      }
      revieweeEmployee {
        id
        no
        firstName
        lastName
        grade
        email
        superior {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        group {
          id
          name
          sort
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        company {
          id
          name
          shortName
          url
          companyReadGroup
          createdAt
          updatedAt
        }
        companyReadGroup
        createdAt
        updatedAt
      }
      secondEmployee {
        id
        no
        firstName
        lastName
        grade
        email
        superior {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        group {
          id
          name
          sort
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        company {
          id
          name
          shortName
          url
          companyReadGroup
          createdAt
          updatedAt
        }
        companyReadGroup
        createdAt
        updatedAt
      }
      section {
        items {
          id
          sectionSheetId
          objective {
            items {
              id
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
              progress
              status
              expStartDate
              expDoneDate
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
                statusValue
                sheetGroupId
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                interviews {
                  nextToken
                }
                revieweeEmployee {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                secondEmployee {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                section {
                  nextToken
                }
                reviewee
                reviewers
                companyReadGroup
                createdAt
                updatedAt
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
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                reviewee
                reviewers
                createdAt
                updatedAt
              }
              reviewee
              reviewers
              createdAt
              updatedAt
            }
            nextToken
          }
          category {
            id
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            no
            name
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          reviewee
          reviewers
          createdAt
          updatedAt
        }
        nextToken
      }
      reviewee
      reviewers
      companyReadGroup
      createdAt
      updatedAt
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
        secondComment
        secondCheckDate
        overAllEvaluation
        statusValue
        sheetGroupId
        group {
          id
          name
          sort
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        interviews {
          items {
            id
            sheetId
            interviewDate
            purpose
            detail
            reviewee
            reviewers
            createdAt
            updatedAt
          }
          nextToken
        }
        revieweeEmployee {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        secondEmployee {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        section {
          items {
            id
            sectionSheetId
            objective {
              items {
                id
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
                progress
                status
                expStartDate
                expDoneDate
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
                  statusValue
                  sheetGroupId
                  reviewee
                  reviewers
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                reviewee
                reviewers
                createdAt
                updatedAt
              }
              nextToken
            }
            category {
              id
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              no
              name
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            reviewee
            reviewers
            createdAt
            updatedAt
          }
          nextToken
        }
        reviewee
        reviewers
        companyReadGroup
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getSection = /* GraphQL */ `
  query GetSection($id: ID!) {
    getSection(id: $id) {
      id
      sectionSheetId
      objective {
        items {
          id
          content
          result
          priority
          selfEvaluation
          firstEvaluation
          lastEvaluation
          progress
          status
          expStartDate
          expDoneDate
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
            statusValue
            sheetGroupId
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            interviews {
              items {
                id
                sheetId
                interviewDate
                purpose
                detail
                reviewee
                reviewers
                createdAt
                updatedAt
              }
              nextToken
            }
            revieweeEmployee {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            secondEmployee {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
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
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                reviewee
                reviewers
                createdAt
                updatedAt
              }
              nextToken
            }
            reviewee
            reviewers
            companyReadGroup
            createdAt
            updatedAt
          }
          objectiveSectionId
          section {
            id
            sectionSheetId
            objective {
              items {
                id
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
                progress
                status
                expStartDate
                expDoneDate
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
                  statusValue
                  sheetGroupId
                  reviewee
                  reviewers
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                reviewee
                reviewers
                createdAt
                updatedAt
              }
              nextToken
            }
            category {
              id
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              no
              name
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            reviewee
            reviewers
            createdAt
            updatedAt
          }
          reviewee
          reviewers
          createdAt
          updatedAt
        }
        nextToken
      }
      category {
        id
        company {
          id
          name
          shortName
          url
          companyReadGroup
          createdAt
          updatedAt
        }
        no
        name
        companyReadGroup
        companyAdminGroup
        createdAt
        updatedAt
      }
      reviewee
      reviewers
      createdAt
      updatedAt
    }
  }
`;
export const listSections = /* GraphQL */ `
  query ListSections(
    $filter: ModelSectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSections(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sectionSheetId
        objective {
          items {
            id
            content
            result
            priority
            selfEvaluation
            firstEvaluation
            lastEvaluation
            progress
            status
            expStartDate
            expDoneDate
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
              statusValue
              sheetGroupId
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              interviews {
                items {
                  id
                  sheetId
                  interviewDate
                  purpose
                  detail
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                nextToken
              }
              revieweeEmployee {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              secondEmployee {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              section {
                items {
                  id
                  sectionSheetId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviewee
              reviewers
              companyReadGroup
              createdAt
              updatedAt
            }
            objectiveSectionId
            section {
              id
              sectionSheetId
              objective {
                items {
                  id
                  content
                  result
                  priority
                  selfEvaluation
                  firstEvaluation
                  lastEvaluation
                  progress
                  status
                  expStartDate
                  expDoneDate
                  objectiveSectionId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                nextToken
              }
              category {
                id
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                no
                name
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              reviewee
              reviewers
              createdAt
              updatedAt
            }
            reviewee
            reviewers
            createdAt
            updatedAt
          }
          nextToken
        }
        category {
          id
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          no
          name
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        reviewee
        reviewers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getObjective = /* GraphQL */ `
  query GetObjective($id: ID!) {
    getObjective(id: $id) {
      id
      content
      result
      priority
      selfEvaluation
      firstEvaluation
      lastEvaluation
      progress
      status
      expStartDate
      expDoneDate
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
        statusValue
        sheetGroupId
        group {
          id
          name
          sort
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        interviews {
          items {
            id
            sheetId
            interviewDate
            purpose
            detail
            reviewee
            reviewers
            createdAt
            updatedAt
          }
          nextToken
        }
        revieweeEmployee {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        secondEmployee {
          id
          no
          firstName
          lastName
          grade
          email
          superior {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          companyReadGroup
          createdAt
          updatedAt
        }
        section {
          items {
            id
            sectionSheetId
            objective {
              items {
                id
                content
                result
                priority
                selfEvaluation
                firstEvaluation
                lastEvaluation
                progress
                status
                expStartDate
                expDoneDate
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
                  statusValue
                  sheetGroupId
                  reviewee
                  reviewers
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                objectiveSectionId
                section {
                  id
                  sectionSheetId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                reviewee
                reviewers
                createdAt
                updatedAt
              }
              nextToken
            }
            category {
              id
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              no
              name
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            reviewee
            reviewers
            createdAt
            updatedAt
          }
          nextToken
        }
        reviewee
        reviewers
        companyReadGroup
        createdAt
        updatedAt
      }
      objectiveSectionId
      section {
        id
        sectionSheetId
        objective {
          items {
            id
            content
            result
            priority
            selfEvaluation
            firstEvaluation
            lastEvaluation
            progress
            status
            expStartDate
            expDoneDate
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
              statusValue
              sheetGroupId
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              interviews {
                items {
                  id
                  sheetId
                  interviewDate
                  purpose
                  detail
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                nextToken
              }
              revieweeEmployee {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              secondEmployee {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              section {
                items {
                  id
                  sectionSheetId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                nextToken
              }
              reviewee
              reviewers
              companyReadGroup
              createdAt
              updatedAt
            }
            objectiveSectionId
            section {
              id
              sectionSheetId
              objective {
                items {
                  id
                  content
                  result
                  priority
                  selfEvaluation
                  firstEvaluation
                  lastEvaluation
                  progress
                  status
                  expStartDate
                  expDoneDate
                  objectiveSectionId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                nextToken
              }
              category {
                id
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                no
                name
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              reviewee
              reviewers
              createdAt
              updatedAt
            }
            reviewee
            reviewers
            createdAt
            updatedAt
          }
          nextToken
        }
        category {
          id
          company {
            id
            name
            shortName
            url
            companyReadGroup
            createdAt
            updatedAt
          }
          no
          name
          companyReadGroup
          companyAdminGroup
          createdAt
          updatedAt
        }
        reviewee
        reviewers
        createdAt
        updatedAt
      }
      reviewee
      reviewers
      createdAt
      updatedAt
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
        content
        result
        priority
        selfEvaluation
        firstEvaluation
        lastEvaluation
        progress
        status
        expStartDate
        expDoneDate
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
          statusValue
          sheetGroupId
          group {
            id
            name
            sort
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          interviews {
            items {
              id
              sheetId
              interviewDate
              purpose
              detail
              reviewee
              reviewers
              createdAt
              updatedAt
            }
            nextToken
          }
          revieweeEmployee {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          secondEmployee {
            id
            no
            firstName
            lastName
            grade
            email
            superior {
              id
              no
              firstName
              lastName
              grade
              email
              superior {
                id
                no
                firstName
                lastName
                grade
                email
                superior {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                companyReadGroup
                createdAt
                updatedAt
              }
              group {
                id
                name
                sort
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              company {
                id
                name
                shortName
                url
                companyReadGroup
                createdAt
                updatedAt
              }
              companyReadGroup
              createdAt
              updatedAt
            }
            group {
              id
              name
              sort
              companyReadGroup
              companyAdminGroup
              createdAt
              updatedAt
            }
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            companyReadGroup
            createdAt
            updatedAt
          }
          section {
            items {
              id
              sectionSheetId
              objective {
                items {
                  id
                  content
                  result
                  priority
                  selfEvaluation
                  firstEvaluation
                  lastEvaluation
                  progress
                  status
                  expStartDate
                  expDoneDate
                  objectiveSectionId
                  reviewee
                  reviewers
                  createdAt
                  updatedAt
                }
                nextToken
              }
              category {
                id
                company {
                  id
                  name
                  shortName
                  url
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                no
                name
                companyReadGroup
                companyAdminGroup
                createdAt
                updatedAt
              }
              reviewee
              reviewers
              createdAt
              updatedAt
            }
            nextToken
          }
          reviewee
          reviewers
          companyReadGroup
          createdAt
          updatedAt
        }
        objectiveSectionId
        section {
          id
          sectionSheetId
          objective {
            items {
              id
              content
              result
              priority
              selfEvaluation
              firstEvaluation
              lastEvaluation
              progress
              status
              expStartDate
              expDoneDate
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
                statusValue
                sheetGroupId
                group {
                  id
                  name
                  sort
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                interviews {
                  nextToken
                }
                revieweeEmployee {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                secondEmployee {
                  id
                  no
                  firstName
                  lastName
                  grade
                  email
                  companyReadGroup
                  createdAt
                  updatedAt
                }
                section {
                  nextToken
                }
                reviewee
                reviewers
                companyReadGroup
                createdAt
                updatedAt
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
                  companyReadGroup
                  companyAdminGroup
                  createdAt
                  updatedAt
                }
                reviewee
                reviewers
                createdAt
                updatedAt
              }
              reviewee
              reviewers
              createdAt
              updatedAt
            }
            nextToken
          }
          category {
            id
            company {
              id
              name
              shortName
              url
              companyReadGroup
              createdAt
              updatedAt
            }
            no
            name
            companyReadGroup
            companyAdminGroup
            createdAt
            updatedAt
          }
          reviewee
          reviewers
          createdAt
          updatedAt
        }
        reviewee
        reviewers
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
