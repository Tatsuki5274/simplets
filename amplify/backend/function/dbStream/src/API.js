"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelSortDirection = exports.ReportWorkingStatus = exports.BooleanType = exports.EmployeeType = exports.ModelAttributeTypes = void 0;
var ModelAttributeTypes;
(function (ModelAttributeTypes) {
    ModelAttributeTypes["binary"] = "binary";
    ModelAttributeTypes["binarySet"] = "binarySet";
    ModelAttributeTypes["bool"] = "bool";
    ModelAttributeTypes["list"] = "list";
    ModelAttributeTypes["map"] = "map";
    ModelAttributeTypes["number"] = "number";
    ModelAttributeTypes["numberSet"] = "numberSet";
    ModelAttributeTypes["string"] = "string";
    ModelAttributeTypes["stringSet"] = "stringSet";
    ModelAttributeTypes["_null"] = "_null";
})(ModelAttributeTypes = exports.ModelAttributeTypes || (exports.ModelAttributeTypes = {}));
var EmployeeType;
(function (EmployeeType) {
    EmployeeType["OTHER"] = "OTHER";
    EmployeeType["NORMAL"] = "NORMAL";
    EmployeeType["MANAGER"] = "MANAGER";
    EmployeeType["SUPER_MANAGER"] = "SUPER_MANAGER";
})(EmployeeType = exports.EmployeeType || (exports.EmployeeType = {}));
var BooleanType;
(function (BooleanType) {
    BooleanType["TRUE"] = "TRUE";
    BooleanType["FALSE"] = "FALSE";
})(BooleanType = exports.BooleanType || (exports.BooleanType = {}));
var ReportWorkingStatus;
(function (ReportWorkingStatus) {
    ReportWorkingStatus["OK"] = "OK";
    ReportWorkingStatus["InTask"] = "InTask";
    ReportWorkingStatus["InProblem"] = "InProblem";
})(ReportWorkingStatus = exports.ReportWorkingStatus || (exports.ReportWorkingStatus = {}));
var ModelSortDirection;
(function (ModelSortDirection) {
    ModelSortDirection["ASC"] = "ASC";
    ModelSortDirection["DESC"] = "DESC";
})(ModelSortDirection = exports.ModelSortDirection || (exports.ModelSortDirection = {}));
