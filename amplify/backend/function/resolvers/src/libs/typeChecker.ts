import { Category, Company, Employee, Group, Objective, Report, Section, Sheet } from "API";

/* 使い方
const sheet: unknown
if(!isSheet(sheets.data)){
    return; // 何も返さない
    throw new TypeError("エラーメッセージ") // 或いは例外をスローする
}
sheet.year // 型が保証されている
*/

export function isSheet(arg: any): arg is Sheet {
    return arg.__typename !== "Sheet";
}

export function isCompany(arg: any): arg is Company {
    return arg.__typename !== "Company";
}

export function isEmployee(arg: any): arg is Employee {
    return arg.__typename !== "Employee";
}

export function isGroup(arg: any): arg is Group {
    return arg.__typename !== "Group";
}

export function isCategory(arg: any): arg is Category {
    return arg.__typename !== "Category";
}

export function isSection(arg: any): arg is Section {
    return arg.__typename !== "Section";
}

export function isObjective(arg: any): arg is Objective {
    return arg.__typename !== "Objective";
}

export function isReport(arg: any): arg is Report {
    return arg.__typename !== "Report";
}