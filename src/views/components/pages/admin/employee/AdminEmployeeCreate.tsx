import { EmployeeType, ListEmployeesQueryVariables } from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { listEmployees, listGroups } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { SelectLabel } from "views/components/atoms/Types";
import AdminEmployeeCreate from "views/components/templates/admin/employee/AdminEmployeeCreate";

const mockData = {
    isAdmin: [
        {
            label: "あり",
            value: "true"
        }, {
            label: "なし",
            value: "false"
        },
    ],
    manager: [
        {
            label: "一般社員",
            value: "NORMAL"
        }, {
            label: "所属長",
            value: "MANAGER"
        }, {
            label: "部門長",
            value: "SUPER_MANAGER"
        },
    ],
}

export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);
    const currentUser = useContext(UserContext);
    const setError = useContext(ErrorContext);

    const [superiors, setSuperiors] = useState<SelectLabel[] | null>(null);
    const [groups, setGroups] = useState<SelectLabel[] | null>(null);


    useEffect(() => {
        // 上司情報の取得
        (async () => {
            if (currentUser) {
                const listI: ListEmployeesQueryVariables = {
                    companyID: currentUser.attributes["custom:companyId"],
                    filter: {
                        manager: {
                            ne: EmployeeType.NORMAL
                        }
                    }
                }
                const superiors = await EmployeeDao.list(listEmployees, listI)
                if (superiors) {
                    const noSuperiorLabel: SelectLabel[] = [
                        {
                            label: "なし",
                            value: ""
                        }
                    ]
                    const superiorsLabel: SelectLabel[] = superiors.map(superior => {
                        return {
                            label: `${superior.localID} ${superior.lastName}${superior.firstName}`,
                            value: superior.username || ""
                        }
                    })
                    setSuperiors(noSuperiorLabel.concat(superiorsLabel))
                } else {
                    setError("上司情報の取得に失敗しました")
                    console.error("上司情報の取得に失敗しました")
                }
            }
        })()
    }, [currentUser])

    useEffect(() => {
        // 部署情報の取得
        (async () => {
            if (currentUser) {
                const groups = await GroupDao.list(listGroups, { companyID: currentUser.attributes["custom:companyId"] })
                if (groups) {
                    const groupsLabel: SelectLabel[] = groups.map(group => {
                        return {
                            label: group.name || "",
                            value: group.localID || ""
                        }
                    })
                    setGroups(groupsLabel)
                } else {
                    setError("部署情報の取得に失敗しました")
                    console.error("部署情報の取得に失敗しました")
                }
            }
        })()
    }, [currentUser])

    return (
        currentUser ?
            <AdminEmployeeCreate
                header={header}
                sidebar={sidebar}
                superiors={superiors}
                groups={groups}
                isAdmin={mockData.isAdmin}
                manager={mockData.manager}
                companyId={currentUser.attributes["custom:companyId"]}
            />
            : null
    )
}