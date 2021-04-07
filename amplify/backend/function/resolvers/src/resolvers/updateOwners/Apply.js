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
Object.defineProperty(exports, "__esModule", { value: true });
var client_1 = require("../../libs/client");
var mutations_1 = require("../../graphql/mutations");
function getSheetKeys(sheet) {
    return sheet.companyID + "." + sheet.reviewee + "." + sheet.year;
}
function getSectionKeys(section) {
    return section.sheetKeys + "." + section.sectionCategoryLocalId;
}
function getObjectiveKeys(objective) {
    return objective.sectionKeys + "." + objective.createdAt;
}
function getReportKeys(report) {
    return report.sub + "." + report.date;
}
function default_1(sheets, sections, objectives, reports) {
    return __awaiter(this, void 0, void 0, function () {
        var client, funcs;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new client_1.GraphQLClient();
                    funcs = [
                        Promise.all(sheets.map(function (sheet) { return __awaiter(_this, void 0, void 0, function () {
                            var params, updateI, updatedSheet;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(sheet.sub && sheet.year)) return [3, 2];
                                        params = {
                                            sub: sheet.sub,
                                            year: sheet.year,
                                            secondReviewers: sheet.secondReviewers,
                                            topReviewers: sheet.topReviewers,
                                            referencer: sheet.referencer,
                                        };
                                        updateI = {
                                            input: params
                                        };
                                        return [4, client.mutate(mutations_1.updateSheet, updateI)];
                                    case 1:
                                        updatedSheet = _a.sent();
                                        if (!updatedSheet) {
                                            throw new Error("updateError: " + getSheetKeys(sheet));
                                        }
                                        else {
                                            console.log("Done updateSheet: " + getSheetKeys(sheet));
                                        }
                                        _a.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); })),
                        Promise.all(sections.map(function (section) { return __awaiter(_this, void 0, void 0, function () {
                            var params, updateI, updatedSection;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(section.sheetKeys && section.sectionCategoryLocalId)) return [3, 2];
                                        params = {
                                            sheetKeys: section.sheetKeys,
                                            sectionCategoryLocalId: section.sectionCategoryLocalId,
                                            secondReviewers: section.secondReviewers,
                                            topReviewers: section.topReviewers,
                                            referencer: section.referencer,
                                        };
                                        updateI = {
                                            input: params
                                        };
                                        return [4, client.mutate(mutations_1.updateSection, updateI)];
                                    case 1:
                                        updatedSection = _a.sent();
                                        if (!updatedSection) {
                                            throw new Error("updateError: " + getSectionKeys(section));
                                        }
                                        console.log("Done updateSection: " + getSectionKeys(section));
                                        _a.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); })),
                        Promise.all(objectives.map(function (objective) { return __awaiter(_this, void 0, void 0, function () {
                            var params, updateI, updatedObjective;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(objective.createdAt && objective.sectionKeys)) return [3, 2];
                                        params = {
                                            createdAt: objective.createdAt,
                                            sectionKeys: objective.sectionKeys,
                                            secondReviewers: objective.secondReviewers,
                                            topReviewers: objective.topReviewers,
                                            referencer: objective.referencer,
                                        };
                                        updateI = {
                                            input: params
                                        };
                                        return [4, client.mutate(mutations_1.updateObjective, updateI)];
                                    case 1:
                                        updatedObjective = _a.sent();
                                        if (!updatedObjective) {
                                            throw new Error("updateError: " + getObjectiveKeys(objective));
                                        }
                                        else {
                                            console.log("Done updateObjective: " + getObjectiveKeys(objective));
                                        }
                                        _a.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); })),
                        Promise.all(reports.map(function (report) { return __awaiter(_this, void 0, void 0, function () {
                            var params, updateI, updatedReport;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        if (!(report.date && report.sub)) return [3, 2];
                                        params = {
                                            date: report.date,
                                            sub: report.sub,
                                            reviewer: report.reviewer,
                                            referencer: report.referencer,
                                        };
                                        updateI = {
                                            input: params
                                        };
                                        return [4, client.mutate(mutations_1.updateReport, updateI)];
                                    case 1:
                                        updatedReport = _a.sent();
                                        if (!updatedReport) {
                                            throw new Error("updateError: " + getReportKeys(report));
                                        }
                                        else {
                                            console.log("Done updateReport: " + getReportKeys(report));
                                        }
                                        _a.label = 2;
                                    case 2: return [2];
                                }
                            });
                        }); }))
                    ];
                    return [4, Promise.all(funcs.map(function (func) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, func];
                                    case 1:
                                        _a.sent();
                                        return [2];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [2, undefined];
            }
        });
    });
}
exports.default = default_1;
