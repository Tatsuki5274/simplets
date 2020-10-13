/* Amplify Params - DO NOT EDIT
	API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_SCCGQL_GRAPHQLAPIIDOUTPUT
	AUTH_SCCSYSTEM2E3482086_USERPOOLID
Amplify Params - DO NOT EDIT */

const ses = require('./ses')
const cgql = require('./customGraphql')
const message = require('./message')

exports.handler = async (event) => {
    const action = event.arguments.action   // "proceed", "remand"
    const sheetId = event.arguments.sheetId // シートID

    if(sheetId === undefined) return Error(ErrorType.SHEETID_NOT_EXIST_ARG)
    else if(action === undefined) return Error(ErrorType.ACTION_NOT_EXIST_ARG);
    else if(
        action !== "proceed" &&
        action !== "remand"
    ) return Error(ErrorType.ACTION_NOT_DEFINED)



    const sheet = await cgql.getSheet(sheetId);
    // return sheet;

    const mailObject = await message.getMessage(sheetId);
    return mailObject;

    if(sheet == null) return Error(ErrorType.SHEET_NOT_EXIST);

    const stepResult = await steps(sheet, action)
    return stepResult;
    const updateResult = await cgql.updateSheetValue(sheetId, stepResult.afterStatusValue);

    return stepResult;
};

// sheet: Sheet, action: String
async function steps(sheet, action){
    const statusValue = sheet.statusValue;
    let value = statusValue;

    const mailObject = await message.getMessage(sheetId);
    return mailObject;

    let response = {
        beforeStatusValue: statusValue,
        afterStatusValue: undefined,
        message: "",
        error: undefined
    }
    try{
        switch(statusValue){
            case 1:
                if(action == "proceed"){
                    value = 2;
                }else throw new Error();
                break;
            case 2:
                if(action == "proceed"){
                    value = 3;
                }else if(action == "remand"){
                    value = 1;
                }
                break;
            case 3:
                if(action == "proceed"){
                    value = 10;
                }else if(action == "remand"){
                    value = 1;
                }
                break;
            case 10:
                if(action == "proceed"){
                    value = 11;
                }else if(action == "remand"){
                    value = 1;
                }
                break;
            case 11:
                if(action == "proceed"){
                    value = 12;
                }else if(action == "remand"){
                    value = 1;
                }
                break;
            case 12:
                if(action == "proceed"){
                    value = 13;
                }else if(action == "remand"){
                    value = 1;
                }
                break;
            case 13:
                if(action == "proceed"){
                    value = 14;
                }else if(action == "remand"){
                    throw new Error();
                }
                break;
            case 14:
                throw new Error();
                break;
            default :
                throw new Error();
                break;
        }
    }catch(e){
        response.error = `statusValus(${statusValue})はaction(${action})をサポートしていません`;
    }
    response.afterStatusValue = value;
    return response;
}

const ErrorType = {
    ACTION_NOT_DEFINED: 0,
    ACTION_NOT_EXIST_ARG: 1,
    SHEETID_NOT_EXIST_ARG: 2,
    SHEET_NOT_EXIST: 3
}

function Error(status){
    let message = "";
    switch(status){
        case ErrorType.ACTION_NOT_DEFINED:
            message = "定義されていないactionが指定されています。仕様を確認してください"
            break;
        case ErrorType.ACTION_NOT_EXIST_ARG:
            message = "actionが引数にありません"
            break;
        case ErrorType.SHEETID_NOT_EXIST_ARG:
            message = "sheetIdが引数にありません"
            break;
        case ErrorType.SHEET_NOT_EXIST:
            message = "シートが存在しません";
            break;
        default:
            message = "不明なエラーです。"
    }
    return {
        statusCode: 200,
        error: message,
        result: false
    }
}