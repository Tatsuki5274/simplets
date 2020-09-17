/* Amplify Params - DO NOT EDIT
	API_SCCGQL_GRAPHQLAPIENDPOINTOUTPUT
	API_SCCGQL_GRAPHQLAPIIDOUTPUT
	AUTH_SCCSYSTEM2E3482086_USERPOOLID
Amplify Params - DO NOT EDIT */

const Status = {
    1: "設定中",
    2: "所属長提出",
    3: "所属長承認済",
    10: "社員評価提出済、所属長評価待",
    11: "所属長評価済、社員確認待",
    12: "社員確認済、所属長承認待",
    13: "所属長承認済、部門長確認待",
    14: "完了"
}

function getStatusStr(statusValue){
    let ret = Status[statusValue];
    if(ret === undefined) ret = "未設定のステータス番号(statusValue="+ statusValue +")";
    return ret;
}

exports.handler = async (event) => {
    const statusValue = event.source.statusValue;
    return getStatusStr(statusValue);
};