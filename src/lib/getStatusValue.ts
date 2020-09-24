enum StatusString {
    "設定中" = 1,
    "所属長提出" = 2,
    "所属長承認済" = 3,
    "社員評価提出済、所属長評価待" = 10,
    "所属長評価済、社員確認待" = 11,
    "社員確認済、所属長承認待" = 12,
    "所属長承認済、部門長確認待" = 13,
    "完了" = 14
}

export enum ApprovalStatus {
    SETTING = 1,
    DONE = 14
}

export function getStatusValue(statusValue: number) {

    let ret = StatusString[statusValue];
    if(!ret) ret = "undefined";

    return ret;
};