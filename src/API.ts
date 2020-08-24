/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type CreateDepartmentInput = {
  id?: string | null,
  code?: string | null,
  name: string,
};

export type ModelDepartmentConditionInput = {
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelDepartmentConditionInput | null > | null,
  or?: Array< ModelDepartmentConditionInput | null > | null,
  not?: ModelDepartmentConditionInput | null,
};

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


export type ModelSizeInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  between?: Array< number | null > | null,
};

export type UpdateDepartmentInput = {
  id: string,
  code?: string | null,
  name?: string | null,
};

export type DeleteDepartmentInput = {
  id?: string | null,
};

export type CreateCategoryInput = {
  id?: string | null,
  code?: string | null,
  name: string,
};

export type ModelCategoryConditionInput = {
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryConditionInput | null > | null,
  or?: Array< ModelCategoryConditionInput | null > | null,
  not?: ModelCategoryConditionInput | null,
};

export type UpdateCategoryInput = {
  id: string,
  code?: string | null,
  name?: string | null,
};

export type DeleteCategoryInput = {
  id?: string | null,
};

export type CreateSheetInput = {
  id?: string | null,
  year: number,
  careerPlan?: string | null,
  careerPlanComment?: string | null,
  overAllEvaluation?: number | null,
  sheetFirstCommentId?: string | null,
  sheetSecondCommentId?: string | null,
};

export type ModelSheetConditionInput = {
  year?: ModelIntInput | null,
  careerPlan?: ModelStringInput | null,
  careerPlanComment?: ModelStringInput | null,
  overAllEvaluation?: ModelIntInput | null,
  and?: Array< ModelSheetConditionInput | null > | null,
  or?: Array< ModelSheetConditionInput | null > | null,
  not?: ModelSheetConditionInput | null,
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

export type UpdateSheetInput = {
  id: string,
  year?: number | null,
  careerPlan?: string | null,
  careerPlanComment?: string | null,
  overAllEvaluation?: number | null,
  sheetFirstCommentId?: string | null,
  sheetSecondCommentId?: string | null,
};

export type DeleteSheetInput = {
  id?: string | null,
};

export type CreateObjectiveInput = {
  id?: string | null,
  objective: string,
  result?: string | null,
  status?: string | null,
  selfEvaluation?: number | null,
  lastEvaluation?: number | null,
  objectiveCategoryId?: string | null,
};

export type ModelObjectiveConditionInput = {
  objective?: ModelStringInput | null,
  result?: ModelStringInput | null,
  status?: ModelStringInput | null,
  selfEvaluation?: ModelIntInput | null,
  lastEvaluation?: ModelIntInput | null,
  and?: Array< ModelObjectiveConditionInput | null > | null,
  or?: Array< ModelObjectiveConditionInput | null > | null,
  not?: ModelObjectiveConditionInput | null,
};

export type UpdateObjectiveInput = {
  id: string,
  objective?: string | null,
  result?: string | null,
  status?: string | null,
  selfEvaluation?: number | null,
  lastEvaluation?: number | null,
  objectiveCategoryId?: string | null,
};

export type DeleteObjectiveInput = {
  id?: string | null,
};

export type CreateCommentInput = {
  id?: string | null,
  comment: string,
};

export type ModelCommentConditionInput = {
  comment?: ModelStringInput | null,
  and?: Array< ModelCommentConditionInput | null > | null,
  or?: Array< ModelCommentConditionInput | null > | null,
  not?: ModelCommentConditionInput | null,
};

export type UpdateCommentInput = {
  id: string,
  comment?: string | null,
};

export type DeleteCommentInput = {
  id?: string | null,
};

export type ModelDepartmentFilterInput = {
  id?: ModelIDInput | null,
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelDepartmentFilterInput | null > | null,
  or?: Array< ModelDepartmentFilterInput | null > | null,
  not?: ModelDepartmentFilterInput | null,
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

export type ModelCategoryFilterInput = {
  id?: ModelIDInput | null,
  code?: ModelStringInput | null,
  name?: ModelStringInput | null,
  and?: Array< ModelCategoryFilterInput | null > | null,
  or?: Array< ModelCategoryFilterInput | null > | null,
  not?: ModelCategoryFilterInput | null,
};

export type ModelSheetFilterInput = {
  id?: ModelIDInput | null,
  year?: ModelIntInput | null,
  careerPlan?: ModelStringInput | null,
  careerPlanComment?: ModelStringInput | null,
  overAllEvaluation?: ModelIntInput | null,
  and?: Array< ModelSheetFilterInput | null > | null,
  or?: Array< ModelSheetFilterInput | null > | null,
  not?: ModelSheetFilterInput | null,
};

export type ModelObjectiveFilterInput = {
  id?: ModelIDInput | null,
  objective?: ModelStringInput | null,
  result?: ModelStringInput | null,
  status?: ModelStringInput | null,
  selfEvaluation?: ModelIntInput | null,
  lastEvaluation?: ModelIntInput | null,
  and?: Array< ModelObjectiveFilterInput | null > | null,
  or?: Array< ModelObjectiveFilterInput | null > | null,
  not?: ModelObjectiveFilterInput | null,
};

export type ModelCommentFilterInput = {
  id?: ModelIDInput | null,
  comment?: ModelStringInput | null,
  and?: Array< ModelCommentFilterInput | null > | null,
  or?: Array< ModelCommentFilterInput | null > | null,
  not?: ModelCommentFilterInput | null,
};

export type CreateDepartmentMutationVariables = {
  input: CreateDepartmentInput,
  condition?: ModelDepartmentConditionInput | null,
};

export type CreateDepartmentMutation = {
  createDepartment:  {
    __typename: "Department",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type UpdateDepartmentMutationVariables = {
  input: UpdateDepartmentInput,
  condition?: ModelDepartmentConditionInput | null,
};

export type UpdateDepartmentMutation = {
  updateDepartment:  {
    __typename: "Department",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type DeleteDepartmentMutationVariables = {
  input: DeleteDepartmentInput,
  condition?: ModelDepartmentConditionInput | null,
};

export type DeleteDepartmentMutation = {
  deleteDepartment:  {
    __typename: "Department",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
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
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
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
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
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
    code: string | null,
    name: string,
    createdOn: string,
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
    careerPlan: string | null,
    careerPlanComment: string | null,
    overAllEvaluation: number | null,
    firstComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    secondComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
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
    careerPlan: string | null,
    careerPlanComment: string | null,
    overAllEvaluation: number | null,
    firstComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    secondComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
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
    careerPlan: string | null,
    careerPlanComment: string | null,
    overAllEvaluation: number | null,
    firstComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    secondComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
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
    category:  {
      __typename: "Category",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    objective: string,
    result: string | null,
    status: string | null,
    selfEvaluation: number | null,
    lastEvaluation: number | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
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
    category:  {
      __typename: "Category",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    objective: string,
    result: string | null,
    status: string | null,
    selfEvaluation: number | null,
    lastEvaluation: number | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
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
    category:  {
      __typename: "Category",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    objective: string,
    result: string | null,
    status: string | null,
    selfEvaluation: number | null,
    lastEvaluation: number | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
  } | null,
};

export type CreateCommentMutationVariables = {
  input: CreateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type CreateCommentMutation = {
  createComment:  {
    __typename: "Comment",
    id: string,
    comment: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type UpdateCommentMutationVariables = {
  input: UpdateCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type UpdateCommentMutation = {
  updateComment:  {
    __typename: "Comment",
    id: string,
    comment: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type DeleteCommentMutationVariables = {
  input: DeleteCommentInput,
  condition?: ModelCommentConditionInput | null,
};

export type DeleteCommentMutation = {
  deleteComment:  {
    __typename: "Comment",
    id: string,
    comment: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type GetDepartmentQueryVariables = {
  id: string,
};

export type GetDepartmentQuery = {
  getDepartment:  {
    __typename: "Department",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type ListDepartmentsQueryVariables = {
  filter?: ModelDepartmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListDepartmentsQuery = {
  listDepartments:  {
    __typename: "ModelDepartmentConnection",
    items:  Array< {
      __typename: "Department",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
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
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
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
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
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
    careerPlan: string | null,
    careerPlanComment: string | null,
    overAllEvaluation: number | null,
    firstComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    secondComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
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
      careerPlan: string | null,
      careerPlanComment: string | null,
      overAllEvaluation: number | null,
      firstComment:  {
        __typename: "Comment",
        id: string,
        comment: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      secondComment:  {
        __typename: "Comment",
        id: string,
        comment: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      createdOn: string,
      updatedOn: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetObjectiveQueryVariables = {
  id: string,
};

export type GetObjectiveQuery = {
  getObjective:  {
    __typename: "Objective",
    id: string,
    category:  {
      __typename: "Category",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    objective: string,
    result: string | null,
    status: string | null,
    selfEvaluation: number | null,
    lastEvaluation: number | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
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
      category:  {
        __typename: "Category",
        id: string,
        code: string | null,
        name: string,
        createdOn: string,
        updatedOn: string,
      } | null,
      objective: string,
      result: string | null,
      status: string | null,
      selfEvaluation: number | null,
      lastEvaluation: number | null,
      createdOn: string,
      updatedOn: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetCommentQueryVariables = {
  id: string,
};

export type GetCommentQuery = {
  getComment:  {
    __typename: "Comment",
    id: string,
    comment: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type ListCommentsQueryVariables = {
  filter?: ModelCommentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListCommentsQuery = {
  listComments:  {
    __typename: "ModelCommentConnection",
    items:  Array< {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateDepartmentSubscription = {
  onCreateDepartment:  {
    __typename: "Department",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnUpdateDepartmentSubscription = {
  onUpdateDepartment:  {
    __typename: "Department",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnDeleteDepartmentSubscription = {
  onDeleteDepartment:  {
    __typename: "Department",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnCreateCategorySubscription = {
  onCreateCategory:  {
    __typename: "Category",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnUpdateCategorySubscription = {
  onUpdateCategory:  {
    __typename: "Category",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnDeleteCategorySubscription = {
  onDeleteCategory:  {
    __typename: "Category",
    id: string,
    code: string | null,
    name: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnCreateSheetSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateSheetSubscription = {
  onCreateSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    overAllEvaluation: number | null,
    firstComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    secondComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
  } | null,
};

export type OnUpdateSheetSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateSheetSubscription = {
  onUpdateSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    overAllEvaluation: number | null,
    firstComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    secondComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
  } | null,
};

export type OnDeleteSheetSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteSheetSubscription = {
  onDeleteSheet:  {
    __typename: "Sheet",
    id: string,
    year: number,
    careerPlan: string | null,
    careerPlanComment: string | null,
    overAllEvaluation: number | null,
    firstComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    secondComment:  {
      __typename: "Comment",
      id: string,
      comment: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
  } | null,
};

export type OnCreateObjectiveSubscriptionVariables = {
  owner?: string | null,
};

export type OnCreateObjectiveSubscription = {
  onCreateObjective:  {
    __typename: "Objective",
    id: string,
    category:  {
      __typename: "Category",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    objective: string,
    result: string | null,
    status: string | null,
    selfEvaluation: number | null,
    lastEvaluation: number | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
  } | null,
};

export type OnUpdateObjectiveSubscriptionVariables = {
  owner?: string | null,
};

export type OnUpdateObjectiveSubscription = {
  onUpdateObjective:  {
    __typename: "Objective",
    id: string,
    category:  {
      __typename: "Category",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    objective: string,
    result: string | null,
    status: string | null,
    selfEvaluation: number | null,
    lastEvaluation: number | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
  } | null,
};

export type OnDeleteObjectiveSubscriptionVariables = {
  owner?: string | null,
};

export type OnDeleteObjectiveSubscription = {
  onDeleteObjective:  {
    __typename: "Objective",
    id: string,
    category:  {
      __typename: "Category",
      id: string,
      code: string | null,
      name: string,
      createdOn: string,
      updatedOn: string,
    } | null,
    objective: string,
    result: string | null,
    status: string | null,
    selfEvaluation: number | null,
    lastEvaluation: number | null,
    createdOn: string,
    updatedOn: string,
    owner: string | null,
  } | null,
};

export type OnCreateCommentSubscription = {
  onCreateComment:  {
    __typename: "Comment",
    id: string,
    comment: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnUpdateCommentSubscription = {
  onUpdateComment:  {
    __typename: "Comment",
    id: string,
    comment: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};

export type OnDeleteCommentSubscription = {
  onDeleteComment:  {
    __typename: "Comment",
    id: string,
    comment: string,
    createdOn: string,
    updatedOn: string,
  } | null,
};
