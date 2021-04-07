"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var API_1 = require("../../API");
function default_1(target, employees) {
    var superior = target.superiorUsername;
    var secondReviewer = superior ? employees.find(function (element) { return element.username && element.username === superior; }) : null;
    var topReviewer = superior ? employees.find(function (element) { return element.username && element.username === (secondReviewer === null || secondReviewer === void 0 ? void 0 : secondReviewer.superiorUsername); }) : null;
    var groupManager = employees.find(function (element) {
        if (element.employeeGroupLocalId && element.employeeGroupLocalId === target.employeeGroupLocalId && element.manager === API_1.EmployeeType.MANAGER) {
            return element;
        }
    }) || null;
    var superManagers = employees.filter(function (employee) {
        return employee.manager === API_1.EmployeeType.SUPER_MANAGER;
    });
    var topReviewers = topReviewer && topReviewer.username ? [topReviewer.username] : [];
    var secondReviewers = secondReviewer && secondReviewer.username ? [secondReviewer.username] : [];
    var referencerEmployees = groupManager ? superManagers.concat(groupManager) : superManagers;
    var referencer = [];
    referencerEmployees.forEach(function (referencerEmployee) {
        if (referencerEmployee.username) {
            referencer.push(referencerEmployee.username);
        }
    });
    return [topReviewers, secondReviewers, referencer];
}
exports.default = default_1;
