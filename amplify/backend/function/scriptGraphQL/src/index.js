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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const addEmployeesSub_1 = __importDefault(require("./scripts/addEmployeesSub"));
const addGroupName_1 = __importDefault(require("./scripts/addGroupName"));
const importOldSheets_1 = __importDefault(require("./scripts/importOldSheets"));
var ScriptTarget;
(function (ScriptTarget) {
    ScriptTarget["ADD_GROUP_NAME"] = "ADD_GROUP_NAME";
    ScriptTarget["ADD_EMPLOYEES_SUB"] = "ADD_EMPLOYEES_SUB";
    ScriptTarget["IMPORT_OLD_SHEETS"] = "IMPORT_OLD_SHEETS";
})(ScriptTarget || (ScriptTarget = {}));
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("event:", event);
    let response = {
        statusCode: 200,
        body: JSON.stringify('Empty'),
    };
    try {
        switch (event.target) {
            case ScriptTarget.ADD_GROUP_NAME:
                yield addGroupName_1.default();
                break;
            case ScriptTarget.ADD_EMPLOYEES_SUB:
                yield addEmployeesSub_1.default();
                break;
            case ScriptTarget.IMPORT_OLD_SHEETS:
                yield importOldSheets_1.default(event.isPreview);
                break;
            default:
                throw new Error("不明なイベントが指定されました");
        }
    }
    catch (e) {
        console.log("例外", e);
    }
    finally {
    }
    return response;
});
exports.handler = handler;
