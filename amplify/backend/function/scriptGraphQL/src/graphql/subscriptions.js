"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.onDeleteObjective = exports.onUpdateObjective = exports.onCreateObjective = exports.onDeleteSection = exports.onUpdateSection = exports.onCreateSection = exports.onDeleteSheet = exports.onUpdateSheet = exports.onCreateSheet = exports.onDeleteCategory = exports.onUpdateCategory = exports.onCreateCategory = exports.onDeleteGroup = exports.onUpdateGroup = exports.onCreateGroup = exports.onDeleteEmployee = exports.onUpdateEmployee = exports.onCreateEmployee = exports.onDeleteCompany = exports.onUpdateCompany = exports.onCreateCompany = exports.onDeleteReport = exports.onUpdateReport = exports.onCreateReport = void 0;
exports.onCreateReport = `
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
exports.onUpdateReport = `
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
exports.onDeleteReport = `
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
exports.onCreateCompany = `
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
exports.onUpdateCompany = `
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
exports.onDeleteCompany = `
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
exports.onCreateEmployee = `
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
exports.onUpdateEmployee = `
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
exports.onDeleteEmployee = `
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
exports.onCreateGroup = `
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
exports.onUpdateGroup = `
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
exports.onDeleteGroup = `
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
exports.onCreateCategory = `
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
exports.onUpdateCategory = `
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
exports.onDeleteCategory = `
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
exports.onCreateSheet = `
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
exports.onUpdateSheet = `
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
exports.onDeleteSheet = `
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
exports.onCreateSection = `
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
exports.onUpdateSection = `
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
exports.onDeleteSection = `
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
exports.onCreateObjective = `
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
exports.onUpdateObjective = `
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
exports.onDeleteObjective = `
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
