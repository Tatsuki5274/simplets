// 今後、ルーティング設定をここに移動

// パスを生成する関数
export const routeBuilder = {
    revieweeDetailPath: (companyId: string, reviewee: string, year: string, host?: string)=>{
        return `${host || ""}/reviewee/company/${companyId}/reviewee/${reviewee}/year/${year}`
    },
    reviewerDetailPath: (companyId: string, reviewee: string, year: string, host?: string)=>{
        return `${host || ""}/reviewer/company/${companyId}/reviewee/${reviewee}/year/${year}`
    },
    revieweeListPath: (host?: string) =>{
        return `${host || ""}/reviewee/list`
    },
    reviewerListPath: (host?: string) =>{
        return `${host || ""}/reviewer/list`
    },
    reviewerEvaluationListPath: (host?: string) =>{
        return `${host || ""}/reviewer/evaluationlist`
    },
    previewPath: (companyId: string, reviewee: string, year: string, host?: string)=>{
        return `${host || ""}/preview/company/${companyId}/reviewee/${reviewee}/year/${year}`
    },
}