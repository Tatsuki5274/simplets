/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateApprovalStatusInput = {
  id?: string | null,
  no?: number | null,
  name: string,
};

export type ModelApprovalStatusConditionInput = {
  no?: ModelIntInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelApprovalStatusConditionInput | null > | null,
  or?: Array< ModelApprovalStatusConditionInput | null > | null,
  not?: ModelApprovalStatusConditionInput | null,
};

export type ModelIntInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
};

export enum ModelAttributeTypes {
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
  _null = "_null",
}


export type ModelStringInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateApprovalStatusInput = {
  id: string,
  no?: number | null,
  name?: string | null,
};

export type DeleteApprovalStatusInput = {
  id?: string | null,
};

export type CreateCompanyInput = {
  id?: string | null,
  name: string,
  shortName?: string | null,
  url?: string | null,
};

export type ModelCompanyConditionInput = {
  name?: ModelStringInput | null,
  shortName?: ModelStringInput | null,
  url?: ModelStringInput | null,
  and?: Array< ModelCompanyConditionInput | null > | null,
  or?: Array< ModelCompanyConditionInput | null > | null,
  not?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyInput = {
  id: string,
  name?: string | null,
  shortName?: string | null,
  url?: string | null,
};

export type DeleteCompanyInput = {
  id?: string | null,
};

export type CreateGroupInput = {
  id?: string | null,
  name: string,
  groupCompanyId?: string | null,
  groupGroupId?: string | null,
};

export type ModelGroupConditionInput = {
  name?: ModelStringInput | null,
  and?: Array< ModelGroupConditionInput | null > | null,
  or?: Array< ModelGroupConditionInput | null > | null,
  not?: ModelGroupConditionInput | null,
};

export type UpdateGroupInput = {
  id: string,
  name?: string | null,
  groupCompanyId?: string | null,
  groupGroupId?: string | null,
};

export type DeleteGroupInput = {
  id?: string | null,
};

export type CreateCategoryInput = {
  id?: string | null,
  no?: number | null,
  name: string,
  categoryCompanyId?: string | null,
};

export type ModelCategoryConditionInput = {
  no?: ModelIntInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  no?: number | null,
  name?: string | null,
  categoryCompanyId?: string | null,
};

export type DeleteCategoryInput = {
  id?: string | null,
};

export type CreateInterviewInput = {
  id?: string | null,
  sheetId?: string | null,
  interviewDate?: string | null,
  detail?: string | null,
  reviewee?: string | null,
};

export type ModelInterviewConditionInput = {
  sheetId?: ModelIDInput | null,
  interviewDate?: ModelStringInput | null,
  detail?: ModelStringInput | null,
  and?: Array< ModelInterviewConditionInput | null > | null,
  or?: Array< ModelInterviewConditionInput | null > | null,
  not?: ModelInterviewConditionInput | null,
};

export type ModelIDInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  size?: ModelSizeInput | null,
};

export type UpdateInterviewInput = {
  id: string,
  sheetId?: string | null,
  interviewDate?: string | null,
  detail?: string | null,
  reviewee?: string | null,
};

export type DeleteInterviewInput = {
  id?: string | null,
};

export type CreateSheetInput = {
  id?: string | null,
  year: number,
  grade: number,
  careerPlan?: string | null,
  careerPlanComment?: string | null,
  reviewComment?: string | null,
  reviewDate?: string | null,
  selfCheckDate?: string | null,
  firstComment?: string | null,
  firstCheckDate?: string | null,
  secondCheckDate?: string | null,
  overAllEvaluation?: number | null,
  companyId: string,
  reviewee?: string | null,
  sheetGroupId?: string | null,
};

export type ModelSheetConditionInput = {
  year?: ModelIntInput | null,
  grade?: ModelIntInput | null,
  careerPlan?: ModelStringInput | null,
  careerPlanComment?: ModelStringInput | null,
  reviewComment?: ModelStringInput | null,
  reviewDate?: ModelStringInput | null,
  selfCheckDate?: ModelStringInput | null,
  firstComment?: ModelStringInput | null,
  firstCheckDate?: ModelStringInput | null,
  secondCheckDate?: ModelStringInput | null,
  overAllEvaluation?: ModelIntInput | null,
  companyId?: ModelIDInput | null,
  and?: Array< ModelSheetConditionInput | null > | null,
  or?: Array< ModelSheetConditionInput | null > | null,
  not?: ModelSheetConditionInput | null,
};

export type UpdateSheetInput = {
  id: string,
  year?: number | null,
  grade?: number | null,
  careerPlan?: string | null,
  careerPlanComment?: string | null,
  reviewComment?: string | null,
  reviewDate?: string | null,
  selfCheckDate?: string | null,
  firstComment?: string | null,
  firstCheckDate?: string | null,
  secondCheckDate?: string | null,
  overAllEvaluation?: number | null,
  companyId?: string | null,
  reviewee?: string | null,
  sheetGroupId?: string | null,
};

export type DeleteSheetInput = {
  id?: string | null,
};

export type CreateObjectiveInput = {
  id?: string | null,
  status?: string | null,
  content: string,
  result?: string | null,
  priority?: string | null,
  selfEvaluation?: number | null,
  firstEvaluation?: number | null,
  lastEvaluation?: number | null,
  reviewee?: string | null,
  objectiveSheetId?: string | null,
  objectiveCategoryId?: string | null,
};

export type ModelObjectiveConditionInput = {
  status?: ModelStringInput | null,
  content?: ModelStringInput | null,
  result?: ModelStringInput | null,
  priority?: ModelStringInput | null,
  selfEvaluation?: ModelIntInput | null,
  firstEvaluation?: ModelIntInput | null,
  lastEvaluation?: ModelIntInput | null,
  and?: Array< ModelObjectiveConditionInput | null > | null,
  or?: Array< ModelObjectiveConditionInput | null > | null,
  not?: ModelObjectiveConditionInput | null,
};

export type UpdateObjectiveInput = {
  id: string,
  status?: string | null,
  content?: string | null,
  result?: string | null,
  priority?: string | null,
  selfEvaluation?: number | null,
  firstEvaluation?: number | null,
  lastEvaluation?: number | null,
  reviewee?: string | null,
  objectiveSheetId?: string | null,
  objectiveCategoryId?: string | null,
};

export type DeleteObjectiveInput = {
  id?: string | null,
};

export type ModelApprovalStatusFilterInput = {
  id?: ModelIDInput | null,
  no?: ModelIntInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelApprovalStatusFilterInput | null > | null,
  or?: Array< ModelApprovalStatusFilterInput | null > | null,
  not?: ModelApprovalStatusFilterInput | null,
};

export type ModelCompanyFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  shortName?: ModelStringInput | null,
  url?: ModelStringInput | null,
  and?: Array< ModelCompanyFilterInput | null > | null,
  or?: Array< ModelCompanyFilterInput | null > | null,
  not?: ModelCompanyFilterInput | null,
};

export type ModelGroupFilterInput = {
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelGroupFilterInput | null > | null,
  or?: Array< ModelGroupFilterInput | null > | null,
  not?: ModelGroupFilterInput | null,
};

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  no?: ModelIntInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelInterviewFilterInput = {
  id?: ModelIDInput | null,
  sheetId?: ModelIDInput | null,
  interviewDate?: ModelStringInput | null,
  detail?: ModelStringInput | null,
  reviewee?: ModelStringInput | null,
  and?: Array< ModelInterviewFilterInput | null > | null,
  or?: Array< ModelInterviewFilterInput | null > | null,
  not?: ModelInterviewFilterInput | null,
};

export type ModelSheetFilterInput = {
  id?: ModelIDInput | null,
  year?: ModelIntInput | null,
  grade?: ModelIntInput | null,
  careerPlan?: ModelStringInput | null,
  careerPlanComment?: ModelStringInput | null,
  reviewComment?: ModelStringInput | null,
  reviewDate?: ModelStringInput | null,
  selfCheckDate?: ModelStringInput | null,
  firstComment?: ModelStringInput | null,
  firstCheckDate?: ModelStringInput | null,
  secondCheckDate?: ModelStringInput | null,
  overAllEvaluation?: ModelIntInput | null,
  companyId?: ModelIDInput | null,
  reviewee?: ModelStringInput | null,
  and?: Array< ModelSheetFilterInput | null > | null,
  or?: Array< ModelSheetFilterInput | null > | null,
  not?: ModelSheetFilterInput | null,
};

export type ModelObjectiveFilterInput = {
  id?: ModelIDInput | null,
  status?: ModelStringInput | null,
  content?: ModelStringInput | null,
  result?: ModelStringInput | null,
  priority?: ModelStringInput | null,
  selfEvaluation?: ModelIntInput | null,
  firstEvaluation?: ModelIntInput | null,
  lastEvaluation?: ModelIntInput | null,
  reviewee?: ModelStringInput | null,
  and?: Array< ModelObjectiveFilterInput | null > | null,
  or?: Array< ModelObjectiveFilterInput | null > | null,
  not?: ModelObjectiveFilterInput | null,
};

export type CreateApprovalStatusMutationVariables = {
  input: CreateApprovalStatusInput,
  condition?: ModelApprovalStatusConditionInput | null,
};

export type CreateApprovalStatusMutation = {
  createApprovalStatus:  {
    __typename: "ApprovalStatus",
    id: string,
    no: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateApprovalStatusMutationVariables = {
  input: UpdateApprovalStatusInput,
  condition?: ModelApprovalStatusConditionInput | null,
};

export type UpdateApprovalStatusMutation = {
  updateApprovalStatus:  {
    __typename: "ApprovalStatus",
    id: string,
    no: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteApprovalStatusMutationVariables = {
  input: DeleteApprovalStatusInput,
  condition?: ModelApprovalStatusConditionInput | null,
};

export type DeleteApprovalStatusMutation = {
  deleteApprovalStatus:  {
    __typename: "ApprovalStatus",
    id: string,
    no: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateCompanyMutationVariables = {
  input: CreateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type CreateCompanyMutation = {
  createCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    shortName: string | null,
    url: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type UpdateCompanyMutationVariables = {
  input: UpdateCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type UpdateCompanyMutation = {
  updateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    shortName: string | null,
    url: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type DeleteCompanyMutationVariables = {
  input: DeleteCompanyInput,
  condition?: ModelCompanyConditionInput | null,
};

export type DeleteCompanyMutation = {
  deleteCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    shortName: string | null,
    url: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type CreateGroupMutationVariables = {
  input: CreateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type CreateGroupMutation = {
  createGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
  } | null,
};

export type UpdateGroupMutationVariables = {
  input: UpdateGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type UpdateGroupMutation = {
  updateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
  } | null,
};

export type DeleteGroupMutationVariables = {
  input: DeleteGroupInput,
  condition?: ModelGroupConditionInput | null,
};

export type DeleteGroupMutation = {
  deleteGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
  } | null,
};

export type CreateCategoryMutationVariables = {
  input: CreateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type CreateCategoryMutation = {
  createCategory:  {
    __typename: "Category",
    id: string,
    no: number | null,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type UpdateCategoryMutationVariables = {
  input: UpdateCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryMutation = {
  updateCategory:  {
    __typename: "Category",
    id: string,
    no: number | null,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type DeleteCategoryMutationVariables = {
  input: DeleteCategoryInput,
  condition?: ModelCategoryConditionInput | null,
};

export type DeleteCategoryMutation = {
  deleteCategory:  {
    __typename: "Category",
    id: string,
    no: number | null,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type CreateInterviewMutationVariables = {
  input: CreateInterviewInput,
  condition?: ModelInterviewConditionInput | null,
};

export type CreateInterviewMutation = {
  createInterview:  {
    __typename: "Interview",
    id: string,
    sheetId: string | null,
    interviewDate: string | null,
    detail: string | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
  } | null,
};

export type UpdateInterviewMutationVariables = {
  input: UpdateInterviewInput,
  condition?: ModelInterviewConditionInput | null,
};

export type UpdateInterviewMutation = {
  updateInterview:  {
    __typename: "Interview",
    id: string,
    sheetId: string | null,
    interviewDate: string | null,
    detail: string | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
  } | null,
};

export type DeleteInterviewMutationVariables = {
  input: DeleteInterviewInput,
  condition?: ModelInterviewConditionInput | null,
};

export type DeleteInterviewMutation = {
  deleteInterview:  {
    __typename: "Interview",
    id: string,
    sheetId: string | null,
    interviewDate: string | null,
    detail: string | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
  } | null,
};

export type CreateSheetMutationVariables = {
  input: CreateSheetInput,
  condition?: ModelSheetConditionInput | null,
};

export type CreateSheetMutation = {
  createSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type UpdateSheetMutationVariables = {
  input: UpdateSheetInput,
  condition?: ModelSheetConditionInput | null,
};

export type UpdateSheetMutation = {
  updateSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type DeleteSheetMutationVariables = {
  input: DeleteSheetInput,
  condition?: ModelSheetConditionInput | null,
};

export type DeleteSheetMutation = {
  deleteSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type CreateObjectiveMutationVariables = {
  input: CreateObjectiveInput,
  condition?: ModelObjectiveConditionInput | null,
};

export type CreateObjectiveMutation = {
  createObjective:  {
    __typename: "Objective",
    id: string,
    status: string | null,
    content: string,
    result: string | null,
    priority: string | null,
    selfEvaluation: number | null,
    firstEvaluation: number | null,
    lastEvaluation: number | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    category:  {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null,
    sheet:  {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type UpdateObjectiveMutationVariables = {
  input: UpdateObjectiveInput,
  condition?: ModelObjectiveConditionInput | null,
};

export type UpdateObjectiveMutation = {
  updateObjective:  {
    __typename: "Objective",
    id: string,
    status: string | null,
    content: string,
    result: string | null,
    priority: string | null,
    selfEvaluation: number | null,
    firstEvaluation: number | null,
    lastEvaluation: number | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    category:  {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null,
    sheet:  {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type DeleteObjectiveMutationVariables = {
  input: DeleteObjectiveInput,
  condition?: ModelObjectiveConditionInput | null,
};

export type DeleteObjectiveMutation = {
  deleteObjective:  {
    __typename: "Objective",
    id: string,
    status: string | null,
    content: string,
    result: string | null,
    priority: string | null,
    selfEvaluation: number | null,
    firstEvaluation: number | null,
    lastEvaluation: number | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    category:  {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null,
    sheet:  {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListSheetsLtGradeQuery = {
  listSheetsLtGrade:  Array< {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null > | null,
};

export type GetApprovalStatusQueryVariables = {
  id: string,
};

export type GetApprovalStatusQuery = {
  getApprovalStatus:  {
    __typename: "ApprovalStatus",
    id: string,
    no: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListApprovalStatussQueryVariables = {
  filter?: ModelApprovalStatusFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListApprovalStatussQuery = {
  listApprovalStatuss:  {
    __typename: "ModelApprovalStatusConnection",
    items:  Array< {
      __typename: "ApprovalStatus",
      id: string,
      no: number | null,
      name: string,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListCompanysQueryVariables = {
  filter?: ModelCompanyFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCompanysQuery = {
  listCompanys:  {
    __typename: "ModelCompanyConnection",
    items:  Array< {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCompanyQueryVariables = {
  id: string,
};

export type GetCompanyQuery = {
  getCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    shortName: string | null,
    url: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type ListGroupsQueryVariables = {
  filter?: ModelGroupFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListGroupsQuery = {
  listGroups:  {
    __typename: "ModelGroupConnection",
    items:  Array< {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetGroupQueryVariables = {
  id: string,
};

export type GetGroupQuery = {
  getGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
  } | null,
};

export type ListCategorysQueryVariables = {
  filter?: ModelCategoryFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCategorysQuery = {
  listCategorys:  {
    __typename: "ModelCategoryConnection",
    items:  Array< {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCategoryQueryVariables = {
  id: string,
};

export type GetCategoryQuery = {
  getCategory:  {
    __typename: "Category",
    id: string,
    no: number | null,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type GetInterviewQueryVariables = {
  id: string,
};

export type GetInterviewQuery = {
  getInterview:  {
    __typename: "Interview",
    id: string,
    sheetId: string | null,
    interviewDate: string | null,
    detail: string | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
  } | null,
};

export type ListInterviewsQueryVariables = {
  filter?: ModelInterviewFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListInterviewsQuery = {
  listInterviews:  {
    __typename: "ModelInterviewConnection",
    items:  Array< {
      __typename: "Interview",
      id: string,
      sheetId: string | null,
      interviewDate: string | null,
      detail: string | null,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type ListSheetsQueryVariables = {
  filter?: ModelSheetFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListSheetsQuery = {
  listSheets:  {
    __typename: "ModelSheetConnection",
    items:  Array< {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetSheetQueryVariables = {
  id: string,
};

export type GetSheetQuery = {
  getSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type GetObjectiveQueryVariables = {
  id: string,
};

export type GetObjectiveQuery = {
  getObjective:  {
    __typename: "Objective",
    id: string,
    status: string | null,
    content: string,
    result: string | null,
    priority: string | null,
    selfEvaluation: number | null,
    firstEvaluation: number | null,
    lastEvaluation: number | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    category:  {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null,
    sheet:  {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type ListObjectivesQueryVariables = {
  filter?: ModelObjectiveFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListObjectivesQuery = {
  listObjectives:  {
    __typename: "ModelObjectiveConnection",
    items:  Array< {
      __typename: "Objective",
      id: string,
      status: string | null,
      content: string,
      result: string | null,
      priority: string | null,
      selfEvaluation: number | null,
      firstEvaluation: number | null,
      lastEvaluation: number | null,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      category:  {
        __typename: "Category",
        id: string,
        no: number | null,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      sheet:  {
        __typename: "Sheet",
        id: string,
        year: number,
        grade: number,
        careerPlan: string | null,
        careerPlanComment: string | null,
        reviewComment: string | null,
        reviewDate: string | null,
        selfCheckDate: string | null,
        firstComment: string | null,
        firstCheckDate: string | null,
        secondCheckDate: string | null,
        overAllEvaluation: number | null,
        companyId: string,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateApprovalStatusSubscription = {
  onCreateApprovalStatus:  {
    __typename: "ApprovalStatus",
    id: string,
    no: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateApprovalStatusSubscription = {
  onUpdateApprovalStatus:  {
    __typename: "ApprovalStatus",
    id: string,
    no: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteApprovalStatusSubscription = {
  onDeleteApprovalStatus:  {
    __typename: "ApprovalStatus",
    id: string,
    no: number | null,
    name: string,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateCompanySubscription = {
  onCreateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    shortName: string | null,
    url: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateCompanySubscription = {
  onUpdateCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    shortName: string | null,
    url: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteCompanySubscription = {
  onDeleteCompany:  {
    __typename: "Company",
    id: string,
    name: string,
    shortName: string | null,
    url: string | null,
    createdAt: string,
    updatedAt: string,
  } | null,
};

export type OnCreateGroupSubscription = {
  onCreateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateGroupSubscription = {
  onUpdateGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteGroupSubscription = {
  onDeleteGroup:  {
    __typename: "Group",
    id: string,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory:  {
    __typename: "Category",
    id: string,
    no: number | null,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory:  {
    __typename: "Category",
    id: string,
    no: number | null,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory:  {
    __typename: "Category",
    id: string,
    no: number | null,
    name: string,
    createdOn: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
  } | null,
};

export type OnCreateInterviewSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnCreateInterviewSubscription = {
  onCreateInterview:  {
    __typename: "Interview",
    id: string,
    sheetId: string | null,
    interviewDate: string | null,
    detail: string | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
  } | null,
};

export type OnUpdateInterviewSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnUpdateInterviewSubscription = {
  onUpdateInterview:  {
    __typename: "Interview",
    id: string,
    sheetId: string | null,
    interviewDate: string | null,
    detail: string | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
  } | null,
};

export type OnDeleteInterviewSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnDeleteInterviewSubscription = {
  onDeleteInterview:  {
    __typename: "Interview",
    id: string,
    sheetId: string | null,
    interviewDate: string | null,
    detail: string | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
  } | null,
};

export type OnCreateSheetSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnCreateSheetSubscription = {
  onCreateSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnUpdateSheetSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnUpdateSheetSubscription = {
  onUpdateSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnDeleteSheetSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnDeleteSheetSubscription = {
  onDeleteSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    grade: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    reviewComment: string | null,
    reviewDate: string | null,
    selfCheckDate: string | null,
    firstComment: string | null,
    firstCheckDate: string | null,
    secondCheckDate: string | null,
    overAllEvaluation: number | null,
    companyId: string,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    company:  {
      __typename: "Company",
      id: string,
      name: string,
      shortName: string | null,
      url: string | null,
      createdAt: string,
      updatedAt: string,
    } | null,
    group:  {
      __typename: "Group",
      id: string,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
    } | null,
    interviews:  {
      __typename: "ModelInterviewConnection",
      items:  Array< {
        __typename: "Interview",
        id: string,
        sheetId: string | null,
        interviewDate: string | null,
        detail: string | null,
        reviewee: string | null,
        createdAt: string,
        updatedOn: string,
      } | null > | null,
      nextToken: string | null,
    } | null,
  } | null,
};

export type OnCreateObjectiveSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnCreateObjectiveSubscription = {
  onCreateObjective:  {
    __typename: "Objective",
    id: string,
    status: string | null,
    content: string,
    result: string | null,
    priority: string | null,
    selfEvaluation: number | null,
    firstEvaluation: number | null,
    lastEvaluation: number | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    category:  {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null,
    sheet:  {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnUpdateObjectiveSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnUpdateObjectiveSubscription = {
  onUpdateObjective:  {
    __typename: "Objective",
    id: string,
    status: string | null,
    content: string,
    result: string | null,
    priority: string | null,
    selfEvaluation: number | null,
    firstEvaluation: number | null,
    lastEvaluation: number | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    category:  {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null,
    sheet:  {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};

export type OnDeleteObjectiveSubscriptionVariables = {
  reviewee?: string | null,
};

export type OnDeleteObjectiveSubscription = {
  onDeleteObjective:  {
    __typename: "Objective",
    id: string,
    status: string | null,
    content: string,
    result: string | null,
    priority: string | null,
    selfEvaluation: number | null,
    firstEvaluation: number | null,
    lastEvaluation: number | null,
    reviewee: string | null,
    createdAt: string,
    updatedOn: string,
    category:  {
      __typename: "Category",
      id: string,
      no: number | null,
      name: string,
      createdOn: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
    } | null,
    sheet:  {
      __typename: "Sheet",
      id: string,
      year: number,
      grade: number,
      careerPlan: string | null,
      careerPlanComment: string | null,
      reviewComment: string | null,
      reviewDate: string | null,
      selfCheckDate: string | null,
      firstComment: string | null,
      firstCheckDate: string | null,
      secondCheckDate: string | null,
      overAllEvaluation: number | null,
      companyId: string,
      reviewee: string | null,
      createdAt: string,
      updatedOn: string,
      company:  {
        __typename: "Company",
        id: string,
        name: string,
        shortName: string | null,
        url: string | null,
        createdAt: string,
        updatedAt: string,
      } | null,
      group:  {
        __typename: "Group",
        id: string,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      interviews:  {
        __typename: "ModelInterviewConnection",
        nextToken: string | null,
      } | null,
    } | null,
  } | null,
};
