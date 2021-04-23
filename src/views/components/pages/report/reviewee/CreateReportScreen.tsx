import { ListEmployeesCompanyQueryVariables } from "API";
import { HeaderContext, SidebarContext, ErrorContext, EmployeeContext, UserContext } from "App";
import { listEmployeesCompany } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { Superior } from "views/components/atoms/Types";
import { RevieweeCreateReportType } from "views/components/organisms/report/reviewee/CreateReport";
import CreateReport from "views/components/templates/report/reviewee/CreateReport";

type Props = {
    match: {
        params: {
            date: Date
        }
    }
}

export function CreateReportScreen(props: Props) {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);
    const setError = useContext(ErrorContext)

    const currentEmployee = useContext(EmployeeContext);
    const currentUser = useContext(UserContext);

    const [reportData, setReportData] = useState<RevieweeCreateReportType>()

    const mockData = {
        header: header,
        sidebar: sidebar,
        workStatusList: [
            {
                value: "OK",
                label: "順調に作業できている"
            },
            {
                value: "InTask",
                label: "課題はあるが作業できている"
            },
            {
                value: "InProblem",
                label: "問題が発生している"
            },
        ],
    }

    useEffect(() => {
        (async () => {
            if (currentUser && currentEmployee) {
                const superiorItem: Superior = {
                    email: currentEmployee.superior?.email || "",
                    username: currentEmployee.superiorUsername || null,
                }

                const listI: ListEmployeesCompanyQueryVariables = {
                    companyID: currentEmployee.companyID
                }
                const referencers = await EmployeeDao.listCompany(listEmployeesCompany, listI)
                if (referencers) {
                    const referencersUsername = referencers.map(referencer => {
                        return referencer.username || null
                    })
                    if (currentUser?.attributes.sub) {
                        const reportItem: RevieweeCreateReportType = {
                            sub: currentUser.attributes.sub,
                            date: String(props.match.params.date),
                            companyID: currentEmployee.companyID || "",
                            superior: superiorItem,
                            superiorName: `${currentEmployee.superior?.lastName || ""} ${currentEmployee.superior?.firstName || ""}`,
                            referencer: referencersUsername,
                            reviewer: [currentEmployee.superiorUsername || ""],
                            reviewee: currentEmployee.username || "",
                            revieweeName: `${currentEmployee.lastName}${currentEmployee.firstName}`,
                            workStatus: mockData.workStatusList,
                        }
                        setReportData(reportItem)
                    } else {
                        console.error("認証情報が取得できません")
                        setError("認証情報が取得できません")
                    }
                } else {
                    console.error("参照者が取得できません")
                    setError("参照者が取得できません")
                }
            }
        })()
    }, [currentEmployee, props.match.params.date, currentUser, setError, mockData.workStatusList])

    if (!reportData) {
        return <div>Loading...</div>
    }
    return (
        <CreateReport
            header={mockData.header}
            sidebar={mockData.sidebar}
            data={reportData}
        />
    )
}