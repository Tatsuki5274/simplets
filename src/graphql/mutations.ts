/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createDepartment = /* GraphQL */ `
  mutation CreateDepartment(
    $input: CreateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    createDepartment(input: $input, condition: $condition) {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const updateDepartment = /* GraphQL */ `
  mutation UpdateDepartment(
    $input: UpdateDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    updateDepartment(input: $input, condition: $condition) {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const deleteDepartment = /* GraphQL */ `
  mutation DeleteDepartment(
    $input: DeleteDepartmentInput!
    $condition: ModelDepartmentConditionInput
  ) {
    deleteDepartment(input: $input, condition: $condition) {
      id
      code
      name
      createdOn
      updatedOn
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
      code
      name
      createdOn
      updatedOn
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
      code
      name
      createdOn
      updatedOn
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
      code
      name
      createdOn
      updatedOn
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
      careerPlan
      careerPlanComment
      overAllEvaluation
      firstComment {
        id
        comment
        createdOn
        updatedOn
      }
      secondComment {
        id
        comment
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
      owner
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
      careerPlan
      careerPlanComment
      overAllEvaluation
      firstComment {
        id
        comment
        createdOn
        updatedOn
      }
      secondComment {
        id
        comment
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
      owner
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
      careerPlan
      careerPlanComment
      overAllEvaluation
      firstComment {
        id
        comment
        createdOn
        updatedOn
      }
      secondComment {
        id
        comment
        createdOn
        updatedOn
      }
      createdOn
      updatedOn
      owner
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
      category {
        id
        code
        name
        createdOn
        updatedOn
      }
      objective
      result
      status
      selfEvaluation
      lastEvaluation
      createdOn
      updatedOn
      owner
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
      category {
        id
        code
        name
        createdOn
        updatedOn
      }
      objective
      result
      status
      selfEvaluation
      lastEvaluation
      createdOn
      updatedOn
      owner
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
      category {
        id
        code
        name
        createdOn
        updatedOn
      }
      objective
      result
      status
      selfEvaluation
      lastEvaluation
      createdOn
      updatedOn
      owner
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      comment
      createdOn
      updatedOn
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      comment
      createdOn
      updatedOn
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      comment
      createdOn
      updatedOn
    }
  }
`;
