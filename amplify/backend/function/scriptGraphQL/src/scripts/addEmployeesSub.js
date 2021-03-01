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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const process_1 = require("process");
const client_1 = require("../client");
const mutations_1 = require("../graphql/mutations");
const queries_1 = require("../graphql/queries");
var cognitoidentityserviceprovider = new aws_sdk_1.default.CognitoIdentityServiceProvider();
function getUsersFromUserPool() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const userPoolId = process_1.env.AUTH_SCCSYSTEME53C89F0_USERPOOLID;
        console.log("ユーザープール", userPoolId);
        if (userPoolId) {
            const params = {
                UserPoolId: userPoolId,
                AttributesToGet: [
                    'sub',
                ],
            };
            const response = yield cognitoidentityserviceprovider.listUsers(params).promise();
            return ((_a = response.Users) === null || _a === void 0 ? void 0 : _a.map(user => {
                var _a, _b;
                return {
                    username: user.Username || null,
                    sub: ((_b = (_a = user.Attributes) === null || _a === void 0 ? void 0 : _a.find(attr => {
                        return attr.Name === "sub";
                    })) === null || _b === void 0 ? void 0 : _b.Value) || null
                };
            })) || null;
        }
        else {
            console.log("ユーザープールが未設定です");
            return null;
        }
    });
}
function default_1() {
    var _a, _b;
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield getUsersFromUserPool();
        if (users) {
            const employees = yield client_1.executeQuery(queries_1.listEmployees, {});
            if ((_a = employees === null || employees === void 0 ? void 0 : employees.data.listEmployees) === null || _a === void 0 ? void 0 : _a.items) {
                for (const emp of employees.data.listEmployees.items) {
                    if ((emp === null || emp === void 0 ? void 0 : emp.username) && emp.companyID) {
                        const param = {
                            input: {
                                companyID: emp.companyID,
                                username: emp.username,
                                sub: ((_b = users.find(user => {
                                    return user.username === emp.username;
                                })) === null || _b === void 0 ? void 0 : _b.sub) || null
                            }
                        };
                        const updated = yield client_1.executeMutation(mutations_1.updateEmployee, param);
                        console.log("result", updated);
                    }
                }
            }
        }
    });
}
exports.default = default_1;
