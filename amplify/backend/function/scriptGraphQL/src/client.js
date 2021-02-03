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
exports.executeMutation = exports.executeQuery = void 0;
const aws_appsync_1 = __importDefault(require("aws-appsync"));
const process_1 = require("process");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
require('isomorphic-fetch');
const client = getClient();
function getClient() {
    const endpoint = process_1.env.API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT;
    const region = process_1.env.REGION;
    const credentials = aws_sdk_1.default.config.credentials;
    if (credentials && endpoint && region) {
        const appSyncClient = new aws_appsync_1.default({
            url: endpoint,
            region: region,
            auth: {
                type: "AWS_IAM",
                credentials: () => credentials
            },
            disableOffline: true,
        });
        return appSyncClient;
    }
    else {
        console.log("Error GraphQL Client", {
            endpoint: endpoint,
            region: region,
            credentials: credentials
        });
        return null;
    }
}
function executeQuery(query, params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (client) {
            const result = yield client.query({
                query: graphql_tag_1.default(query),
                variables: params
            });
            const asset = result;
            return asset;
        }
        return null;
    });
}
exports.executeQuery = executeQuery;
function executeMutation(mutation, params) {
    return __awaiter(this, void 0, void 0, function* () {
        if (client) {
            const res = yield client.mutate({
                mutation: graphql_tag_1.default(mutation),
                variables: params,
            });
            return res;
        }
        else {
            return null;
        }
    });
}
exports.executeMutation = executeMutation;
