enum StatusString {
  "目標：設定中" = 1,
  "目標：所属長提出済" = 2,
  "目標：所属長承認済" = 3,
  "評価：社員評価提出済、所属長評価待" = 10,
  "評価：所属長評価済、社員確認待" = 11,
  "評価：社員確認済、所属長承認待" = 12,
  "評価：所属長承認済、部門長確認待" = 13,
  "評価：完了" = 14,
}

export enum ApprovalStatus {
  SETTING = 1,
  DONE = 14,
}

export function getStatusValue(statusValue: number) {
  let ret = StatusString[statusValue];
  if (!ret) ret = "undefined";

  return ret;
}
