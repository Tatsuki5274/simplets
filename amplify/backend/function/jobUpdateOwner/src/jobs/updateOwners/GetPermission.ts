import { Employee, EmployeeType } from "../../API";

export default function (target: Employee, employees: (Employee | null)[]) {
  const superior = target.superiorUsername;
  // const secondReviewer = superior
  //   ? employees.find(
  //       (element) =>
  //         element && element.username && element.username === superior
  //     )
  //   : null;
  let secondReviewer: Employee | null = null;
  if (superior) {
    secondReviewer =
      employees.find((element) => element?.username === superior) || null;
  }
  const topReviewer = superior
    ? employees.find(
        (element) =>
          element?.username &&
          element.username === secondReviewer?.superiorUsername
      )
    : null;
  const groupManager =
    employees.find((element) => {
      if (
        element?.groupID === target.groupID &&
        element?.manager === EmployeeType.MANAGER
      ) {
        return element;
      }
    }) || null;
  const superManagers = employees.filter((employee) => {
    return employee?.manager === EmployeeType.SUPER_MANAGER;
  });
  let topReviewers: string[] = [];
  if (topReviewer?.username) {
    topReviewers = [topReviewer.username];
  }
  let secondReviewers: string[] = [];
  if (secondReviewer?.username) {
    secondReviewers = [secondReviewer.username];
  }
  const referencerEmployees = superManagers.concat(groupManager || []);

  const referencer: string[] = [];
  referencerEmployees.forEach((referencerEmployee) => {
    if (!referencerEmployee?.username) return;
    referencer.push(referencerEmployee.username);
  });

  return { topReviewers, secondReviewers, referencer };
}
