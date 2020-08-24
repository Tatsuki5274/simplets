/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateDepartment = /* GraphQL */ `
  subscription OnCreateDepartment {
    onCreateDepartment {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const onUpdateDepartment = /* GraphQL */ `
  subscription OnUpdateDepartment {
    onUpdateDepartment {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const onDeleteDepartment = /* GraphQL */ `
  subscription OnDeleteDepartment {
    onDeleteDepartment {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const onCreateCategory = /* GraphQL */ `
  subscription OnCreateCategory {
    onCreateCategory {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const onUpdateCategory = /* GraphQL */ `
  subscription OnUpdateCategory {
    onUpdateCategory {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const onDeleteCategory = /* GraphQL */ `
  subscription OnDeleteCategory {
    onDeleteCategory {
      id
      code
      name
      createdOn
      updatedOn
    }
  }
`;
export const onCreateSheet = /* GraphQL */ `
  subscription OnCreateSheet($owner: String) {
    onCreateSheet(owner: $owner) {
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
export const onUpdateSheet = /* GraphQL */ `
  subscription OnUpdateSheet($owner: String) {
    onUpdateSheet(owner: $owner) {
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
export const onDeleteSheet = /* GraphQL */ `
  subscription OnDeleteSheet($owner: String) {
    onDeleteSheet(owner: $owner) {
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
export const onCreateObjective = /* GraphQL */ `
  subscription OnCreateObjective($owner: String) {
    onCreateObjective(owner: $owner) {
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
export const onUpdateObjective = /* GraphQL */ `
  subscription OnUpdateObjective($owner: String) {
    onUpdateObjective(owner: $owner) {
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
export const onDeleteObjective = /* GraphQL */ `
  subscription OnDeleteObjective($owner: String) {
    onDeleteObjective(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment {
    onCreateComment {
      id
      comment
      createdOn
      updatedOn
    }
  }
`;
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment {
    onUpdateComment {
      id
      comment
      createdOn
      updatedOn
    }
  }
`;
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment {
    onDeleteComment {
      id
      comment
      createdOn
      updatedOn
    }
  }
`;
