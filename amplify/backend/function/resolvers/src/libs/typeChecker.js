"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isReport = exports.isObjective = exports.isSection = exports.isCategory = exports.isGroup = exports.isEmployee = exports.isCompany = exports.isSheet = void 0;
function isSheet(arg) {
    return arg.__typename !== "Sheet";
}
exports.isSheet = isSheet;
function isCompany(arg) {
    return arg.__typename !== "Company";
}
exports.isCompany = isCompany;
function isEmployee(arg) {
    return arg.__typename !== "Employee";
}
exports.isEmployee = isEmployee;
function isGroup(arg) {
    return arg.__typename !== "Group";
}
exports.isGroup = isGroup;
function isCategory(arg) {
    return arg.__typename !== "Category";
}
exports.isCategory = isCategory;
function isSection(arg) {
    return arg.__typename !== "Section";
}
exports.isSection = isSection;
function isObjective(arg) {
    return arg.__typename !== "Objective";
}
exports.isObjective = isObjective;
function isReport(arg) {
    return arg.__typename !== "Report";
}
exports.isReport = isReport;
