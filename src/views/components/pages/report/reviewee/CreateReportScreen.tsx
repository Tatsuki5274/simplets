import { BooleanType, EmployeeType } from "API";
import { EmployeeContext, HeaderContext, SidebarContext } from "App";
import { listEmployeesManager } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import React, { useContext, useEffect, useState } from "react";
import { Superior } from "views/components/atoms/Types";
import { RevieweeCreateReportType } from "views/components/organisms/report/CreateReport";
import CreateReport from "views/components/templates/report/reviewee/CreateReport";

type Props = {
    match: {
        params: {
            date: string
        }
    }
}

const mockData = {

    data: {
        workStatus: [
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
        ]

    },
}

export default function (props: Props) {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)

    const currentEmployee = useContext(EmployeeContext);
    const [reportData, setReportData] = useState<RevieweeCreateReportType>()

    useEffect(() => {
        (async () => {
            
            if (currentEmployee) {
                const superiorItem: Superior = {
                    email: currentEmployee.superior?.email || "",
                    username: currentEmployee.superiorUsername || null,
                }
                
                // 参照者の情報を取得
                const superManagers = await EmployeeDao.listManager(listEmployeesManager, {
                    companyID: currentEmployee.companyID,
                    managerIsDeleted: {
                        eq: {
                            manager: EmployeeType.SUPER_MANAGER,
                            isDeleted: BooleanType.FALSE
                        }
                    }
                })
                const groupManagers = await EmployeeDao.listManager(listEmployeesManager, {
                    companyID: currentEmployee.companyID,
                    managerIsDeleted: {
                        eq: {
                            manager: EmployeeType.MANAGER,
                            isDeleted: BooleanType.FALSE
                        }
                    }, filter: {
                        employeeGroupLocalId: {
                            eq: currentEmployee.employeeGroupLocalId
                        }
                    }
                })
                let listSuperManagers: Array<string> = [];
                let listGroupManagers: Array<string> = [];
                if (superManagers) {
                    superManagers.forEach(element => {
                        if (element.username) {
                            listSuperManagers.push(element.username)
                        }
                    });
                }
                if (groupManagers) {
                    groupManagers.forEach(element => {
                        if (element.username) {
                            listGroupManagers.push(element.username)
                        }
                    });
                }
                const managers = listSuperManagers.concat(listGroupManagers)

                const reportItem: RevieweeCreateReportType = {
                    date: props.match.params.date,
                    companyID: currentEmployee.companyID || "",
                    superior: superiorItem,
                    referencer: managers,
                    reviewer: [currentEmployee.superiorUsername || ""],
                    reviewee: currentEmployee.username || "",
                    revieweeName: `${currentEmployee.lastName}${currentEmployee.firstName}`,
                    workStatus: mockData.data.workStatus,
                }
                setReportData(reportItem)
            }
        })()
    }, [currentEmployee, props.match.params.date])



    return (
        reportData ?
            <CreateReport
                header={header}
                sidebar={sidebar}
                data={reportData}
            /> : null
    )
}