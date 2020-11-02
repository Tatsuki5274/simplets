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
    const superiors: Array<string | null> =
        [superior ? superior.email : "", superior?.superior ? superior.superior.email : "", superior?.superior?.superior ? superior.superior.superior.email : ""];
    
    //空要素を削除
    const superiorEmail: Array<string | null> = superiors.filter(Boolean);
    // ceoメール情報を定義
    var ceoEmail: string | null = superiorEmail[superiorEmail.length - 1];
    
    let emailInput: SendEmail = {
        to: ["test"],
        // cc: [""],
        // bcc: [""],
        subject: "subject",
        body: "body"
    }

    //URL情報取得
    const protocol = window.location.protocol;
    const hostName = window.location.host;
    const hostUrl = protocol + '//' + hostName;
    const sheetId = sheet.id;
    //console.log('hostURL', hostUrl);

    const mainUrl = hostUrl + '/reviewee/sheet/' + sheetId; //メイン画面URL
    const detailUrl = hostUrl + '/reviewer/sheet/' + sheetId; //評価画面URL

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
                    body: detailUrl.link(detailUrl),
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
                        body: mainUrl.link(mainUrl),
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "2:差し戻し",
                        body: mainUrl.link(mainUrl),
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
                        body: detailUrl.link(detailUrl)
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "3:差し戻し",
                        body: mainUrl.link(mainUrl)
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
                        body: mainUrl.link(mainUrl)
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "10:差し戻し",
                        body: mainUrl.link(mainUrl)
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
                        body: detailUrl.link(detailUrl)
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "11:差し戻し",
                        body: mainUrl.link(mainUrl)
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
                    if (superiorEmail[0] == ceoEmail || superiorEmail[1] == ceoEmail) {
                        emailInput = {
                            to: [ceoEmail,superiorEmail[0],revieweeEmail],
                            //cc: [""],
                            //bcc: [""],
                            subject: "12:最終承認",
                            body: "最終承認"
                        }

                    } else {
                        emailInput = {
                            to: [superiorEmail[1]],
                            //cc: [""],
                            //bcc: [""],
                            subject: "12:承認依頼",
                            body: detailUrl.link(detailUrl)
                        }
                    }
                    break;
                case "remand":
                    emailInput = {
                        to: [revieweeEmail],
                        //cc: [""],
                        //bcc: [""],
                        subject: "12:差し戻し",
                        body: mainUrl.link(mainUrl)
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