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
exports.handler = void 0;
const client_1 = require("./client");
const mutations_1 = require("./graphql/mutations");
const queries_1 = require("./graphql/queries");
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    console.log("event:", event);
    try {
        const listSheetItems = yield client_1.executeQuery(queries_1.listSheets, {});
        if ((_a = listSheetItems === null || listSheetItems === void 0 ? void 0 : listSheetItems.data.listSheets) === null || _a === void 0 ? void 0 : _a.items) {
            for (const sheet of listSheetItems.data.listSheets.items) {
                if ((sheet === null || sheet === void 0 ? void 0 : sheet.companyID) && ((_b = sheet.group) === null || _b === void 0 ? void 0 : _b.name)) {
                    const param = {
                        input: {
                            companyID: sheet.companyID,
                            year: sheet.year,
                            reviewee: sheet.reviewee,
                            sheetGroupName: sheet.group.name
                        }
                    };
                    try {
                        const result = yield client_1.executeMutation(mutations_1.updateSheet, param);
                        console.log("result", JSON.stringify(result, null, 2));
                    }
                    catch (err) {
                        console.log("error", err);
                    }
                }
                else {
                    console.log("必要な情報の取得に失敗しました", sheet);
                }
            }
        }
    }
    catch (err) {
        console.log("err", err);
    }
    const response = {
        statusCode: 200,
        body: JSON.stringify('Done!'),
    };
    return response;
});
exports.handler = handler;
