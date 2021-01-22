import { Employee, SendEmail, Sheet } from "App";

export enum Command {
    REVIEWEE_SUBMIT,
    SUP1_APPLOVAL,
    REVIEWEE_INPUT_RESULT,
    SUP1_INPUT_SCORE,
    REVIEWEE_CONFIRM_SCORE,
    SUP1_CONFIRM,
    SUP2_DONE,
    SUP1_DONE,
    REMAND_FROM_SUBMIT,
    REVIEWEE_CHANGE_OBJECTIVE,
    REMAND_FROM_INPUT_RESULT,
    REMAND_FROM_SUR1_CONFIRM,
    REVIWEE_PULLBACK_SUBMIT,
    REVIWEE_PULLBACK_APPROVAL
}

const systemName = "Simplet's"

type ReturnType = {
    sheet: Sheet,
    mailObject: SendEmail | null
}

/**
 * 
 * @param command 承認フローのコマンドを選択
 * @param sheet 処理対象のシートを指定
 * @param reason 差し戻しの場合は差し戻し理由を指定
 */
export function commandWorkFlow(command: Command, sheet: Sheet, reason?: string): ReturnType {
    let ret: ReturnType = {
        sheet: sheet,
        mailObject: null,
    }
    let key = -1;
    let status = sheet.statusValue;
    switch (command) {
        case Command.REVIEWEE_SUBMIT:
            status = 2
            key = 1
            break
        case Command.SUP1_APPLOVAL:
            status = 3
            key = 2
            break
        case Command.REVIEWEE_INPUT_RESULT:
            status = 10
            key = 3
            break
        case Command.SUP1_INPUT_SCORE:
            status = 11
            key = 4
            break;
        case Command.REVIEWEE_CONFIRM_SCORE:
            status = 12
            key = 5
            break
        case Command.SUP1_CONFIRM:
            status = 13
            key = 7
            break
        case Command.SUP2_DONE:
            status = 14
            key = 8
            break
        case Command.SUP1_DONE:
            status = 14
            key = 8
            break;
        case Command.REMAND_FROM_SUBMIT:
            key = 10
            status = 1
            break;
        case Command.REVIEWEE_CHANGE_OBJECTIVE:
            status = 1
            break;
        case Command.REMAND_FROM_INPUT_RESULT:
            key = 10
            status = 1
            break;
        case Command.REMAND_FROM_SUR1_CONFIRM:
            key = 11
            status = 1
            break
        case Command.REVIWEE_PULLBACK_SUBMIT:
            key = 14
            status = 1
        case Command.REVIWEE_PULLBACK_APPROVAL:
            key = 13
            status = 1
    }
    if(key !== -1){
        ret.mailObject = getMailObject(key, sheet, reason)
    }
    ret.sheet.statusValue = status
    return ret;
}

function getEmployees(employee: Employee): Employee[]{
    const ret: Employee[] = []
    let work: any = employee
    do{
        ret.push(work)
        work = work.superior;
    }while(work)
    return ret
}

function getMailObject(key: number, sheet: Sheet, reason?: string): SendEmail | null{
    let ret: SendEmail = {
        to: [null],
        cc: null,
        bcc: null,
        body: "",
        subject: "",
    } 
    let isInitSuccess = true;
    if(sheet.revieweeEmployee){
        const employees = getEmployees(sheet.revieweeEmployee as Employee)
        console.log("getEmployee", employees)

        let reviewee = {
            name: "",
            email: ""
        }
        let sup1 = {
            name: "",
            email: ""
        }
        let sup2 = {
            name: "",
            email: ""
        }
        let ceo = {
            name: "",
            email: ""
        }
        if(employees.length === 2){
            reviewee.name = `${employees[0].lastName} ${employees[0].firstName}`
            reviewee.email = employees[0].email
            sup1.name = `${employees[1].lastName} ${employees[1].firstName}`
            sup1.email = employees[1].email
            ceo.name = `${employees[1].lastName} ${employees[2].firstName}`
            ceo.email = employees[1].email          
        }
        if(employees.length === 3){
            reviewee.name = `${employees[0].lastName} ${employees[0].firstName}`
            reviewee.email = employees[0].email
            sup1.name = `${employees[1].lastName} ${employees[1].firstName}`
            sup1.email = employees[1].email
            ceo.name = `${employees[2].lastName} ${employees[2].firstName}`
            ceo.email = employees[2].email
        }else if(employees.length >= 4){
            reviewee.name = `${employees[0].lastName} ${employees[0].firstName}`
            reviewee.email = employees[0].email
            sup1.name = `${employees[1].lastName} ${employees[1].firstName}`
            sup1.email = employees[1].email
            sup2.name = `${employees[2].lastName} ${employees[2].firstName}`
            sup2.email = employees[2].email
            ceo.name = `${employees[employees.length-1].lastName} ${employees[employees.length-1].firstName}`
            ceo.email = employees[employees.length-1].email
        }else{
            console.error("社員情報に誤りがあります", employees)
            isInitSuccess = false
        }

        if(isInitSuccess){
            const protocol = window.location.protocol;
            const hostName = window.location.host;
            const hostUrl = protocol + '//' + hostName;
            const revieweeUrl = `${hostUrl}/reviewee/company/${sheet.companyID}/reviewee/${sheet.reviewee}/year/${sheet.year}`;
            const reviewerUrl = `${hostUrl}/reviewer/company/${sheet.companyID}/reviewee/${sheet.reviewee}/year/${sheet.year}`;


            switch (key) {
                case 1:
                    ret.to = [sup1.email]
                    ret.subject = `[${systemName}]  目標設定が提出されました`
                    ret.body = `
${sup1.name}様:

目標設定が完了しました。

----------------------------------------------------------------------
社員: ${reviewee.name}
申請の種類: 目標提出
----------------------------------------------------------------------

以下のURLにアクセスし承認をおこなってください。
目標が不十分の場合は、差し戻してください。
${reviewerUrl}

# 本メールは${sup1.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。`
                    break;
                case 2:
                    ret.to = [reviewee.email]
                    ret.subject = `[${systemName}]  目標設定が承認されました`
                    ret.body = `
${reviewee.name}様:

目標設定が承認されました。

----------------------------------------------------------------------
所属長: ${sup1.name}
申請の種類: 目標設定承認
----------------------------------------------------------------------

以下のURLにアクセスし、進捗および実績を設入力してください。
${revieweeUrl}

# 本メールは${reviewee.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
`
                    break;
                case 3:
                    ret.to = [sup1.email]
                    ret.subject = `[${systemName}]  目標設定の実績が入力されましたので評価をお願いいたします`
                    ret.body = `
${sup1.name}様:

目標の実績入力と社員の自己評価が完了しました。

----------------------------------------------------------------------
社員: ${reviewee.name}
申請の種類: 所属長評価待ち
----------------------------------------------------------------------

面談を実施後、以下のURLにアクセスし、項目毎評価、年度評価を入力してください。
依頼内容に不足があれば差し戻してください。
${reviewerUrl}

# 本メールは${sup1.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 4:
                    ret.to = [reviewee.email]
                    ret.subject = `[${systemName}]  今年度の総合評価が決定しました`
                    ret.body = `
${reviewee.name}様:

所属長より年度評価が入力されました。

----------------------------------------------------------------------
所属長: ${sup1.name}
申請の種類: 目標設定承認
----------------------------------------------------------------------

以下のURLにアクセスし、年度評価を確認してください。
${revieweeUrl}

# 本メールは${reviewee.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 5:
                    ret.to = [sup1.email]
                    ret.subject = `[${systemName}]  目標設定の実績の確認が完了しました`
                    ret.body = `
${sup1.name}様:

評価の確認が完了しました。

----------------------------------------------------------------------
社員: ${reviewee.name}
申請の種類: 評価の確認
----------------------------------------------------------------------

以下のURLにアクセスし、部門長へ評価確認を行ってください。
${reviewerUrl}

# 本メールは${sup1.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 7:
                    ret.to = [sup2.email]
                    ret.subject = `[${systemName}]  今年度評価へのコメントをお願いいたします`
                    ret.body = `
${sup2.email}様:

所属長の評価が完了しました。
コメントを入力して年度評価を完了してください。

----------------------------------------------------------------------
社員: ${reviewee.name}
申請の種類: 最終承認
----------------------------------------------------------------------

以下のURLにアクセスし部門長コメントを入力してください。
${reviewerUrl}

# 本メールは${sup2.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 8:
                    ret.to = Array.from(new Set([ceo.email, sup1.email, reviewee.email]))
                    ret.subject = `[${systemName}]  評価が完了しました`
                    ret.body = `
最終承認者のコメントが記入されました。

----------------------------------------------------------------------
社員: ${reviewee.name}
申請の種類: 完了
----------------------------------------------------------------------

以下のURLにアクセスしコメントを確認してください。
${reviewerUrl}

# 本メールは${ceo.email}/${sup1.email}/${reviewee.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 10:
                    ret.to = [reviewee.email]
                    ret.subject = `[${systemName}]  目標が差し戻されました`
                    ret.body = `
${reviewee.name}様:

目標設定が差し戻されました、
目標を修正し、再度承認依頼を行なってください。

----------------------------------------------------------------------
所属長: ${sup1.name}
申請の種類: 差し戻し
理由：${reason}
----------------------------------------------------------------------

以下のURLにアクセスし目標設定を修正してください。
${revieweeUrl}

# 本メールは${reviewee.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 11:
                    ret.to = [reviewee.email]
                    ret.subject = `[${systemName}]  評価依頼が差し戻されました`
                    ret.body = `
${reviewee.name}様:

評価依頼が差し戻されました。修正し再度、評価依頼を行なってください。

----------------------------------------------------------------------
所属長: ${sup1.name}
申請の種類: 差し戻し
理由：${reason}
----------------------------------------------------------------------

以下のURLにアクセスし
実績、自己評価を修正し再度申請してください。
※）社員目標設定待ちに戻りますので、目標設定の承認依頼を行ってください。
　　所属長承認後、評価依頼を行ってください。
${revieweeUrl}

# 本メールは${reviewee.email}宛にお送りしています。
# 本メールはシステムより自動送信されています。
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 13:
                    ret.to = [sup1.email]
                    ret.subject = `[${systemName}]  承認依頼が引き戻されました`
                    ret.body = `
${sup1.name}様:

承認依頼が引き戻されました

---------------------------------------------------------------------- 
社員: ${reviewee.name} 承認依頼引き戻し
---------------------------------------------------------------------- 

    ${reviewerUrl} 

# 本メールは${sup1.email}宛にお送りしています。 
# 本メールはシステムより自動送信されています。 
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
                case 14:
                    ret.to = [sup1.email]
                    ret.subject = `[${systemName}]  承認済み目標が引き戻されました`
                    ret.body = `
${sup1.name}様:

承認済み目標が引き戻されました

---------------------------------------------------------------------- 
社員: ${reviewee.name} 承認済み目標引き戻し
---------------------------------------------------------------------- 

    ${reviewerUrl}

# 本メールは${reviewerUrl}宛にお送りしています。 
# 本メールはシステムより自動送信されています。 
# 本メールに返信されましても、返答できませんのでご了承ください。
                    `
                    break;
            }
        }else{
            console.error("社員データの初期化に失敗しました", employees)
            return null
        }
    }else{
        console.error("被評価者者が登録されていません")
        return null
    }
    // ret.body = ret.body.replace(/\s+/g, "");
    return ret;
}