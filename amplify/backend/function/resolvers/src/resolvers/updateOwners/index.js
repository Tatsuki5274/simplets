"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../../libs/client");
var queries_1 = require("../../graphql/queries");
var Apply_1 = __importDefault(require("./Apply"));
var GetPermission_1 = __importDefault(require("./GetPermission"));
var typeChecker_1 = require("../../libs/typeChecker");
function getSheetKeys(sheet) {
    return sheet.companyID + "." + sheet.reviewee + "." + sheet.year;
}
function getSectionKeys(section) {
    return section.sheetKeys + "." + section.sectionCategoryLocalId;
}
function UpdateOwners(event) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var companyId, isCompanyAdmin, claims, client, employeesItems, employees, sheetsItems, sheets, sectionsItems, sections, objectivesItems, objectives, reportsItems, reports, _loop_1, _i, employees_1, employee;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    companyId = null;
                    isCompanyAdmin = false;
                    claims = (_a = event.identity) === null || _a === void 0 ? void 0 : _a.claims;
                    if (typeof claims === "object") {
                        companyId = typeof claims["custom:companyId"] === "string" ? claims["custom:companyId"] : null;
                        isCompanyAdmin = typeof claims["custom:isCompanyAdmin"] === "boolean" ? claims["custom:isCompanyAdmin"] : false;
                    }
                    if (!isCompanyAdmin) {
                    }
                    if (!companyId) {
                        throw new Error("CompanyID is not set");
                    }
                    client = new client_1.GraphQLClient();
                    return [4, client.query(queries_1.listEmployees, { companyID: companyId })];
                case 1:
                    employeesItems = _b.sent();
                    if (!typeChecker_1.isEmployee((employeesItems === null || employeesItems === void 0 ? void 0 : employeesItems.data).listEmployees.items)) {
                        throw new TypeError('TypeError : employeesItems');
                    }
                    employees = (employeesItems === null || employeesItems === void 0 ? void 0 : employeesItems.data).listEmployees.items;
                    return [4, client.query(queries_1.listSheetReviewee, { companyID: companyId })];
                case 2:
                    sheetsItems = _b.sent();
                    if (!typeChecker_1.isSheet(sheetsItems.data.listSheetReviewee.items)) {
                        throw new TypeError('TypeError : sheetsItems');
                    }
                    sheets = sheetsItems.data.listSheetReviewee.items;
                    return [4, client.query(queries_1.listSections, { filter: { companyID: { eq: companyId } } })];
                case 3:
                    sectionsItems = _b.sent();
                    if (!typeChecker_1.isSection((sectionsItems.data.listSections.items))) {
                        throw new TypeError('TypeError : sectionsItems');
                    }
                    sections = sectionsItems.data.listSections.items;
                    return [4, client.query(queries_1.listObjectives, { filter: { companyID: { eq: companyId } } })];
                case 4:
                    objectivesItems = _b.sent();
                    if (!typeChecker_1.isObjective(objectivesItems.data.listObjectives.items)) {
                        throw new TypeError('TypeError : objectivesItems');
                    }
                    objectives = objectivesItems.data.listObjectives.items;
                    return [4, client.query(queries_1.listReports, {})];
                case 5:
                    reportsItems = _b.sent();
                    if (!typeChecker_1.isReport(reportsItems.data.listReports.items)) {
                        throw new TypeError('TypeError : reportsItems');
                    }
                    reports = reportsItems.data.listReports.items;
                    if (!(employees && sheets)) return [3, 7];
                    _loop_1 = function (employee) {
                        var reviewers = GetPermission_1.default(employee, employees);
                        var secondReviewers = reviewers[0];
                        var topReviewers = reviewers[1];
                        var referencer = reviewers[2];
                        if (reviewers) {
                            var selectedSheets = sheets.filter(function (sheet) { return sheet.sub === employee.sub; });
                            var _loop_2 = function (sheet) {
                                sheet.secondReviewers = secondReviewers;
                                sheet.topReviewers = topReviewers;
                                sheet.referencer = referencer;
                                var selectedSections = sections.filter(function (section) { return section.sheetKeys === getSheetKeys(sheet); });
                                var _loop_3 = function (section) {
                                    section.secondReviewers = secondReviewers;
                                    section.topReviewers = topReviewers;
                                    section.referencer = referencer;
                                    var selectedObjectives = objectives.filter(function (objective) { return objective.sectionKeys === getSectionKeys(section); });
                                    for (var _i = 0, selectedObjectives_1 = selectedObjectives; _i < selectedObjectives_1.length; _i++) {
                                        var objective = selectedObjectives_1[_i];
                                        objective.secondReviewers = secondReviewers;
                                        objective.topReviewers = topReviewers;
                                        objective.referencer = referencer;
                                    }
                                };
                                for (var _i = 0, selectedSections_1 = selectedSections; _i < selectedSections_1.length; _i++) {
                                    var section = selectedSections_1[_i];
                                    _loop_3(section);
                                }
                            };
                            for (var _i = 0, selectedSheets_1 = selectedSheets; _i < selectedSheets_1.length; _i++) {
                                var sheet = selectedSheets_1[_i];
                                _loop_2(sheet);
                            }
                            var selectedReports = reports.filter(function (report) { return report.sub === employee.sub; });
                            for (var _a = 0, selectedReports_1 = selectedReports; _a < selectedReports_1.length; _a++) {
                                var report = selectedReports_1[_a];
                                report.reviewer = secondReviewers;
                                report.referencer = referencer;
                            }
                        }
                    };
                    for (_i = 0, employees_1 = employees; _i < employees_1.length; _i++) {
                        employee = employees_1[_i];
                        _loop_1(employee);
                    }
                    return [4, Apply_1.default(sheets, sections, objectives, reports)];
                case 6:
                    _b.sent();
                    return [2, {
                            message: "hello"
                        }];
                case 7: return [2];
            }
        });
    });
}
exports.default = UpdateOwners;
