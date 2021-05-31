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
var aws_sdk_1 = __importDefault(require("aws-sdk"));
var process_1 = require("process");
var updateEmployeeSub_1 = __importDefault(require("./scripts/updateEmployeeSub"));
aws_sdk_1.default.config.update({ region: "ap-northeast-1" });
function default_1(record) {
    var _a, _b, _c, _d, _e, _f, _g;
    return __awaiter(this, void 0, void 0, function () {
        var cognitoidentityserviceprovider, dynamoDb, newImage, email, companyID, isCompanyAdmin, username, params, result, userName, sub, companyId, updated;
        return __generator(this, function (_h) {
            switch (_h.label) {
                case 0:
                    cognitoidentityserviceprovider = new aws_sdk_1.default.CognitoIdentityServiceProvider();
                    if (!process_1.env.AUTH_SCCSYSTEME53C89F0_USERPOOLID) return [3, 4];
                    console.log("record:", JSON.stringify(record));
                    dynamoDb = record["dynamodb"];
                    newImage = dynamoDb["NewImage"];
                    email = String(newImage["email"].S);
                    companyID = String(newImage["companyID"].S);
                    isCompanyAdmin = String(newImage["isCompanyAdmin"].BOOL);
                    username = String(newImage["username"].S);
                    params = {
                        UserPoolId: process_1.env.AUTH_SCCSYSTEME53C89F0_USERPOOLID,
                        Username: username,
                        DesiredDeliveryMediums: [
                            "EMAIL",
                        ],
                        TemporaryPassword: "pass1234",
                        UserAttributes: [
                            {
                                Name: "email",
                                Value: email,
                            },
                            {
                                Name: "email_verified",
                                Value: "false",
                            },
                            {
                                Name: "custom:companyId",
                                Value: companyID,
                            },
                            {
                                Name: "custom:isCompanyAdmin",
                                Value: isCompanyAdmin,
                            },
                        ],
                    };
                    return [4, cognitoidentityserviceprovider
                            .adminCreateUser(params)
                            .promise()];
                case 1:
                    result = _h.sent();
                    console.log(JSON.stringify(result));
                    userName = (_a = result.User) === null || _a === void 0 ? void 0 : _a.Username;
                    sub = (_d = (_c = (_b = result.User) === null || _b === void 0 ? void 0 : _b.Attributes) === null || _c === void 0 ? void 0 : _c.find(function (element) {
                        return element.Name === "sub";
                    })) === null || _d === void 0 ? void 0 : _d.Value;
                    companyId = (_g = (_f = (_e = result.User) === null || _e === void 0 ? void 0 : _e.Attributes) === null || _f === void 0 ? void 0 : _f.find(function (element) {
                        return element.Name === "custom:companyId";
                    })) === null || _g === void 0 ? void 0 : _g.Value;
                    if (!(userName && sub && companyId)) return [3, 3];
                    return [4, updateEmployeeSub_1.default(userName, sub, companyId)];
                case 2:
                    updated = _h.sent();
                    return [3, 4];
                case 3: throw new Error("required field is undefined");
                case 4: return [2];
            }
        });
    });
}
exports.default = default_1;
