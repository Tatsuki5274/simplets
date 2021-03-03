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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../client");
const sheetTable_1 = require("../data/sheetTable");
const mutations_1 = require("../graphql/mutations");
const addEmployeesSub_1 = require("./addEmployeesSub");
function default_1(isPreview = true) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z, _0, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20, _21, _22, _23, _24, _25, _26, _27, _28, _29, _30, _31, _32, _33, _34, _35, _36;
    return __awaiter(this, void 0, void 0, function* () {
        const jsonStrs = sheetTable_1.data.split("\n");
        const users = yield addEmployeesSub_1.getUsersFromUserPool();
        let count = 0;
        if (users) {
            for (const jsonStr of jsonStrs) {
                let json = undefined;
                try {
                    json = JSON.parse(jsonStr);
                }
                catch (e) {
                    json = null;
                }
                if (json) {
                    const sub = (_a = users.find(user => {
                        var _a;
                        return user.username === ((_a = json.Item) === null || _a === void 0 ? void 0 : _a.reviewee.S);
                    })) === null || _a === void 0 ? void 0 : _a.sub;
                    if (sub) {
                        count++;
                        const param = {
                            input: {
                                sub: sub,
                                year: ((_c = (_b = json.Item) === null || _b === void 0 ? void 0 : _b.year) === null || _c === void 0 ? void 0 : _c.N) || null,
                                companyID: ((_e = (_d = json.Item) === null || _d === void 0 ? void 0 : _d.companyID) === null || _e === void 0 ? void 0 : _e.S) || null,
                                grade: ((_g = (_f = json.Item) === null || _f === void 0 ? void 0 : _f.grade) === null || _g === void 0 ? void 0 : _g.S) || null,
                                careerPlan: ((_j = (_h = json.Item) === null || _h === void 0 ? void 0 : _h.careerPlan) === null || _j === void 0 ? void 0 : _j.S) || null,
                                careerPlanComment: ((_l = (_k = json.Item) === null || _k === void 0 ? void 0 : _k.careerPlanComment) === null || _l === void 0 ? void 0 : _l.S) || null,
                                reviewComment: ((_o = (_m = json.Item) === null || _m === void 0 ? void 0 : _m.reviewComment) === null || _o === void 0 ? void 0 : _o.S) || null,
                                reviewDate: ((_q = (_p = json.Item) === null || _p === void 0 ? void 0 : _p.reviewDate) === null || _q === void 0 ? void 0 : _q.S) || null,
                                selfCheckDate: ((_s = (_r = json.Item) === null || _r === void 0 ? void 0 : _r.selfCheckDate) === null || _s === void 0 ? void 0 : _s.S) || null,
                                firstComment: ((_u = (_t = json.Item) === null || _t === void 0 ? void 0 : _t.firstComment) === null || _u === void 0 ? void 0 : _u.S) || null,
                                firstCheckDate: ((_w = (_v = json.Item) === null || _v === void 0 ? void 0 : _v.firstCheckDate) === null || _w === void 0 ? void 0 : _w.S) || null,
                                secondComment: ((_y = (_x = json.Item) === null || _x === void 0 ? void 0 : _x.secondComment) === null || _y === void 0 ? void 0 : _y.S) || null,
                                secondCheckDate: ((_0 = (_z = json.Item) === null || _z === void 0 ? void 0 : _z.secondCheckDate) === null || _0 === void 0 ? void 0 : _0.S) || null,
                                overAllEvaluation: ((_2 = (_1 = json.Item) === null || _1 === void 0 ? void 0 : _1.overAllEvaluation) === null || _2 === void 0 ? void 0 : _2.N) || null,
                                statusValue: ((_4 = (_3 = json.Item) === null || _3 === void 0 ? void 0 : _3.statusValue) === null || _4 === void 0 ? void 0 : _4.N) || null,
                                interviewPlanDate: ((_6 = (_5 = json.Item) === null || _5 === void 0 ? void 0 : _5.interviewPlanDate) === null || _6 === void 0 ? void 0 : _6.S) || null,
                                interviewPlanComment: ((_8 = (_7 = json.Item) === null || _7 === void 0 ? void 0 : _7.interviewPlanComment) === null || _8 === void 0 ? void 0 : _8.S) || null,
                                InterviewMid1Date: ((_10 = (_9 = json.Item) === null || _9 === void 0 ? void 0 : _9.InterviewMid1Date) === null || _10 === void 0 ? void 0 : _10.S) || null,
                                InterviewMid1Comment: ((_12 = (_11 = json.Item) === null || _11 === void 0 ? void 0 : _11.InterviewMid1Comment) === null || _12 === void 0 ? void 0 : _12.S) || null,
                                InterviewMid2Date: ((_14 = (_13 = json.Item) === null || _13 === void 0 ? void 0 : _13.InterviewMid2Date) === null || _14 === void 0 ? void 0 : _14.S) || null,
                                InterviewMid2Comment: ((_16 = (_15 = json.Item) === null || _15 === void 0 ? void 0 : _15.InterviewMid2Comment) === null || _16 === void 0 ? void 0 : _16.S) || null,
                                InterviewMid3Date: ((_18 = (_17 = json.Item) === null || _17 === void 0 ? void 0 : _17.InterviewMid3Date) === null || _18 === void 0 ? void 0 : _18.S) || null,
                                InterviewMid3Comment: ((_20 = (_19 = json.Item) === null || _19 === void 0 ? void 0 : _19.InterviewMid3Comment) === null || _20 === void 0 ? void 0 : _20.S) || null,
                                revieweeUsername: ((_22 = (_21 = json.Item) === null || _21 === void 0 ? void 0 : _21.revieweeUsername) === null || _22 === void 0 ? void 0 : _22.S) || null,
                                secondUsername: ((_24 = (_23 = json.Item) === null || _23 === void 0 ? void 0 : _23.secondUsername) === null || _24 === void 0 ? void 0 : _24.S) || null,
                                sheetGroupLocalId: ((_26 = (_25 = json.Item) === null || _25 === void 0 ? void 0 : _25.sheetGroupLocalId) === null || _26 === void 0 ? void 0 : _26.S) || null,
                                sheetGroupName: ((_28 = (_27 = json.Item) === null || _27 === void 0 ? void 0 : _27.sheetGroupName) === null || _28 === void 0 ? void 0 : _28.S) || null,
                                referencer: ((_30 = (_29 = json.Item) === null || _29 === void 0 ? void 0 : _29.referencer) === null || _30 === void 0 ? void 0 : _30.L) || null,
                                reviewee: ((_32 = (_31 = json.Item) === null || _31 === void 0 ? void 0 : _31.reviewee) === null || _32 === void 0 ? void 0 : _32.S) || null,
                                topReviewers: ((_34 = (_33 = json.Item) === null || _33 === void 0 ? void 0 : _33.topReviewers) === null || _34 === void 0 ? void 0 : _34.L) || null,
                                secondReviewers: ((_36 = (_35 = json.Item) === null || _35 === void 0 ? void 0 : _35.secondReviewers) === null || _36 === void 0 ? void 0 : _36.L) || null,
                            }
                        };
                        console.log("param", param);
                        if (!isPreview) {
                            const updated = yield client_1.executeMutation(mutations_1.createSheet, param);
                            console.log("成功", updated === null || updated === void 0 ? void 0 : updated.errors);
                        }
                    }
                    else {
                        console.log("subが存在しませんでした");
                    }
                }
                else {
                    console.log("jsonの解析に失敗しました", jsonStr);
                }
            }
            console.log("正常件数", count);
        }
    });
}
exports.default = default_1;
