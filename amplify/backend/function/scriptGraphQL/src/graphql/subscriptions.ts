/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateReport = /* GraphQL */ `
  subscription OnCreateReport(
    $reviewee: String
    $referencer: String
    $reviewer: String
  ) {
    onCreateReport(
      reviewee: $reviewee
      referencer: $referencer
      reviewer: $reviewer
    ) {
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onUpdateReport = /* GraphQL */ `
  subscription OnUpdateReport(
    $reviewee: String
    $referencer: String
    $reviewer: String
  ) {
    onUpdateReport(
      reviewee: $reviewee
      referencer: $referencer
      reviewer: $reviewer
    ) {
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onDeleteReport = /* GraphQL */ `
  subscription OnDeleteReport(
    $reviewee: String
    $referencer: String
    $reviewer: String
  ) {
    onDeleteReport(
      reviewee: $reviewee
      referencer: $referencer
      reviewer: $reviewer
    ) {
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
    }
  }
`;
export const onCreateCompany = /* GraphQL */ `
  subscription OnCreateCompany {
    onCreateCompany {
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
export const onUpdateCompany = /* GraphQL */ `
  subscription OnUpdateCompany {
    onUpdateCompany {
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
export const onDeleteCompany = /* GraphQL */ `
  subscription OnDeleteCompany {
    onDeleteCompany {
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
export const onCreateEmployee = /* GraphQL */ `
  subscription OnCreateEmployee {
    onCreateEmployee {
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const onUpdateEmployee = /* GraphQL */ `
  subscription OnUpdateEmployee {
    onUpdateEmployee {
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const onDeleteEmployee = /* GraphQL */ `
  subscription OnDeleteEmployee {
    onDeleteEmployee {
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
    }
  }
`;
export const onCreateGroup = /* GraphQL */ `
  subscription OnCreateGroup {
    onCreateGroup {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateGroup = /* GraphQL */ `
  subscription OnUpdateGroup {
    onUpdateGroup {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteGroup = /* GraphQL */ `
  subscription OnDeleteGroup {
    onDeleteGroup {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      companyID
      localID
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateSheet = /* GraphQL */ `
  subscription OnCreateSheet(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onCreateSheet(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
      sheetGroupName
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      section {
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
          category {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
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
        }
        nextToken
      }
    }
  }
`;
export const onUpdateSheet = /* GraphQL */ `
  subscription OnUpdateSheet(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onUpdateSheet(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
      sheetGroupName
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      section {
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
          category {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
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
        }
        nextToken
      }
    }
  }
`;
export const onDeleteSheet = /* GraphQL */ `
  subscription OnDeleteSheet(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onDeleteSheet(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
      sheetGroupName
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
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
        manager
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
                group {
                  companyID
                  localID
                  name
                  createdAt
                  updatedAt
                }
              }
              group {
                companyID
                localID
                name
                createdAt
                updatedAt
              }
            }
            group {
              companyID
              localID
              name
              createdAt
              updatedAt
            }
          }
          group {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
        }
        group {
          companyID
          localID
          name
          createdAt
          updatedAt
        }
      }
      group {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
      section {
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
          category {
            companyID
            localID
            name
            createdAt
            updatedAt
          }
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
        }
        nextToken
      }
    }
  }
`;
export const onCreateSection = /* GraphQL */ `
  subscription OnCreateSection(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onCreateSection(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
      category {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
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
    }
  }
`;
export const onUpdateSection = /* GraphQL */ `
  subscription OnUpdateSection(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onUpdateSection(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
      category {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
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
    }
  }
`;
export const onDeleteSection = /* GraphQL */ `
  subscription OnDeleteSection(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onDeleteSection(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
      category {
        companyID
        localID
        name
        createdAt
        updatedAt
      }
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
    }
  }
`;
export const onCreateObjective = /* GraphQL */ `
  subscription OnCreateObjective(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onCreateObjective(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
export const onUpdateObjective = /* GraphQL */ `
  subscription OnUpdateObjective(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onUpdateObjective(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
export const onDeleteObjective = /* GraphQL */ `
  subscription OnDeleteObjective(
    $topReviewers: String
    $secondReviewers: String
    $reviewee: String
    $referencer: String
  ) {
    onDeleteObjective(
      topReviewers: $topReviewers
      secondReviewers: $secondReviewers
      reviewee: $reviewee
      referencer: $referencer
    ) {
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
