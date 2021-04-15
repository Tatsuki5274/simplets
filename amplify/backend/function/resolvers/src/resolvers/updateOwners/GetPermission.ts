import { Employee, EmployeeType } from "../../API";

export default function (target: Employee, employees: Employee[]) {
    const superior = target.superiorUsername;
    const secondReviewer = superior ? employees.find(element => element.username && element.username === superior) : null
    const topReviewer = superior ? employees.find(element => element.username && element.username === secondReviewer?.superiorUsername) : null
    const groupManager = employees.find(element => {
        if (element.employeeGroupLocalId && element.employeeGroupLocalId === target.employeeGroupLocalId && element.manager === EmployeeType.MANAGER) {
            return element
        }
    }) || null
    const superManagers = employees.filter(employee => {
        return employee.manager === EmployeeType.SUPER_MANAGER
    })

    const topReviewers = topReviewer && topReviewer.username ? [topReviewer.username] : []
    const secondReviewers = secondReviewer && secondReviewer.username ? [secondReviewer.username] : []
    const referencerEmployees = groupManager ? superManagers.concat(groupManager) : superManagers;
    const referencer: string[] = []
    referencerEmployees.forEach(referencerEmployee => {
        if (referencerEmployee.username) {
            referencer.push(referencerEmployee.username)
        }
    })

    return {topReviewers, secondReviewers, referencer}
}