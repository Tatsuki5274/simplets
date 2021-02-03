/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

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
