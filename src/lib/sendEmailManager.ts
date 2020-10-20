import { Employee, SendEmail, Sheet } from "App";
import Amplify from 'aws-amplify';
import config from 'aws-exports';
import API, { GraphQLResult, graphqlOperation }
    from '@aws-amplify/api';
import * as APIt from 'API';
import { updateSheet } from "graphql/mutations";

export default function emailParameterChange(sheet: Sheet, action: "remand" | "proceed") {

    const emailSheet: Sheet = sheet;
    const emailAction: "remand" | "proceed" = action;
    const employee = emailSheet.revieweeEmployee;
    const superior = employee?.superior;
    const revieweeEmail: string = employee?.email || "";
    const superiorEmail: Array<string | null> =
        [superior ? superior.email : "", superior?.superior ? superior.superior.email : "", superior?.superior?.superior ? superior.superior.superior.email : ""];
    const ceoEmail : string = superiorEmail[superiorEmail.length - 1 ] || "";

    let emailInput: SendEmail = {
        to: ["test"],
        // cc: [""],
        // bcc: [""],
        subject: "subject",
        body: "body"
    }
    console.log("statusVal", emailSheet.statusValue)
    switch (emailSheet.statusValue) {
        // 1.設定中
        case 1:
            if (emailAction === 'proceed') {
                emailInput = {
                    to: [superiorEmail[0]],
                    //cc: [""],
                    //bcc: [""],
                    subject: "1:目標設定中",
                    body: "目標設定中"
                }
            }
            break;
        // 2.所属長提出済
        case 2:
            switch (emailAction) {
                case "proceed":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "2:承認",
                        body: "承認"
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "2:差し戻し",
                        body: "差し戻し"
                    }
                    break;
                default:
                    break;
            };
            break;
        // 3.所属長承認済
        case 3:
            switch (emailAction) {
                case "proceed":
                    emailInput = {
                        to: [superiorEmail[0]],
                        //cc: [""],
                        //bcc: [""],
                        subject: "3:承認",
                        body: "承認"
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "3:差し戻し",
                        body: "差し戻し"
                    }
                    break;
                default:
                    break;

            };
            break;

        // 10.社員評価提出済、所属長評価待
        case 10:
            switch (emailAction) {
                case "proceed":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "10:承認",
                        body: "承認"
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "10:差し戻し",
                        body: "差し戻し"
                    }
                    break;
                default:
                    break;

            };
            break;

        // 11.所属長評価済、社員確認待
        case 11:
            switch (emailAction) {
                case "proceed":
                    emailInput = {
                        to: [superiorEmail[0]],
                        //cc: [""],
                        //bcc: [""],
                        subject: "11:承認",
                        body: "承認"
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "11:差し戻し",
                        body: "差し戻し"
                    }
                    break;
                default:
                    break;

            };
            break;

        // 12.社員確認済、所属長承認待
        case 12:
            switch (emailAction) {
                case "proceed":
                    if (superiorEmail[1] === superiorEmail[superiorEmail.length - 1]) {
                        emailInput = {
                            to: [superiorEmail[superiorEmail.length - 1]],
                            //cc: [""],
                            //bcc: [""],
                            subject: "12:承認",
                            body: "承認"
                        }

                    } else {
                        emailInput = {
                            to: [superiorEmail[1]],
                            //cc: [""],
                            //bcc: [""],
                            subject: "12:承認依頼",
                            body: "承認依頼"
                        }
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "12:差し戻し",
                        body: "差し戻し"
                    }
                default:
                    break;

            };
            break;

        // 13.所属長承認済、部門長確認待
        case 13:
            switch (emailAction) {
                case "proceed":
                    emailInput = {
                        to: [ceoEmail,superiorEmail[0],revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "13:承認",
                        body: "承認"
                    }
                    break;
                default:
                    break;

            };
            break;

        default:
            break;

    }
    return emailInput;
}