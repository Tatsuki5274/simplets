import { SendEmail, Sheet } from "App";
import Amplify from 'aws-amplify';
import config from 'aws-exports';
import API, { GraphQLResult, graphqlOperation }
    from '@aws-amplify/api';
import * as APIt from 'API';
import { sendEmail, updateSheet } from "graphql/mutations";
import emailParameterChange from "./sendEmailManager";
import { resolve } from "dns";

/**
 * 
 * @param sheet     ステータス変更の参照元のシート
 * @param action    ステータス変更の操作
 * @returns    変更後のステータスを含むシート
 */
export async function exec(sheet: Sheet, action: "remand" | "proceed"): Promise<Sheet> {
    const response = emailParameterChange(sheet, action);

    let retSheet = sheet;
    const changedStatusValue = step(sheet.statusValue || -1, action);
    retSheet.statusValue = changedStatusValue;
    console.log("email", response)

    if (changedStatusValue == -1) {
        console.error("statusValueとactionが不正です");
    } else {
        const updateI: APIt.UpdateSheetInput =
        {
            id: sheet.id,
            statusValue: changedStatusValue
        }
        const updateMV: APIt.UpdateSheetMutationVariables = {
            input: updateI,
        };
        let updateR: GraphQLResult<APIt.UpdateSheetMutation>
        try {
            updateR = await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;
        } catch (e) {
            console.log("エラーを無視しています")
            updateR = e
        }
        if (updateR.data) {
            const updateTM: APIt.UpdateSheetMutation = updateR.data;
            if (updateTM.updateSheet) {
                const updatedSheet: Sheet = updateTM.updateSheet;
                console.log('UpdateSheet:', updatedSheet);
            }
        }
    }

    //メールを送信するミューテーションを実行
    sendEmailMutation(response);

    return retSheet;
}

/**
 * statusValueを適切な値へ変更する関数
 * @param statusValue 変更元のstatusValue
 * @param action      ステータスに対する動作
 * @returns 変更後のステータス番号 存在しない場合は -1 を返す
 */
function step(statusValue: number, action: "remand" | "proceed"): number {
    let value = -1;
    switch (statusValue) {
        case 1:
            if (action == "proceed") {
                value = 2;
            }
            break;
        case 2:
            if (action == "proceed") {
                value = 3;
            } else if (action == "remand") {
                value = 1;
            }
            break;
        case 3:
            if (action == "proceed") {
                value = 10;
            } else if (action == "remand") {
                value = 1;
            }
            break;
        case 10:
            if (action == "proceed") {
                value = 11;
            } else if (action == "remand") {
                value = 1;
            }
            break;
        case 11:
            if (action == "proceed") {
                value = 12;
            } else if (action == "remand") {
                value = 1;
            }
            break;
        case 12:
            if (action == "proceed") {
                value = 13;
            } else if (action == "remand") {
                value = 1;
            }
            break;
        case 13:
            if (action == "proceed") {
                value = 14;
            }
            break;
        // case 14:
        //     break;
        default:
            break;
    }
    return value;
}

//メール送信情報をミューテーション
async function sendEmailMutation(sendEmailInput: SendEmail) {
    const sendEmailItem: SendEmail = sendEmailInput;

    const sendI: APIt.sendEmailInput = {
        to: sendEmailItem.to,
        cc: sendEmailItem.cc,
        bcc: sendEmailItem.bcc,
        subject: sendEmailItem.subject,
        body: sendEmailItem.body
    }
    console.log('sendI', sendI);


    const sendMV: APIt.SendEmailMutationVariables = {
        input: sendI
    }

    const sendR: GraphQLResult<APIt.SendEmailMutation> = await API.graphql(graphqlOperation(sendEmail, sendMV)) as GraphQLResult<APIt.SendEmailMutation>;
    console.log('sendR', sendR);
}