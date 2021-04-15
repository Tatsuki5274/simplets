import { BooleanType, EmployeeType, GetEmployeeQueryVariables, ListEmployeeLocalIdQueryVariables, ListEmployeesQueryVariables } from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { getEmployee, listEmployeeLocalId, listEmployees, listGroups } from "graphql/queries";
import { EmployeeDao } from "lib/dao/employeeDao";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { SelectLabel } from "views/components/atoms/Types";
import { AdminEditEmployeeDataType } from "views/components/organisms/admin/employee/AdminEmployeeEdit";
import EmployeeEdit from "views/components/templates/admin/employee/EmployeeEdit";

const MockData = {
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

type Props = {
    match: {
        params: {
            employeeId: string
        }
    }
}

export default function (props: Props) {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext);

    const currentUser = useContext(UserContext);
    const setError = useContext(ErrorContext)

    const [groups, setGroups] = useState<SelectLabel[] | null>(null);
    const [superiors, setSuperiors] = useState<SelectLabel[] | null>(null);
    const [employee, setEmployee] = useState<AdminEditEmployeeDataType | null>(null);

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
        // 社員情報の取得
        (async () => {
            if (currentUser) {
                const listI: ListEmployeeLocalIdQueryVariables = {
                    companyID: currentUser.attributes["custom:companyId"],
                    localID: {
                        eq: props.match.params.employeeId
                    }
                }
                const getEmployeeItem = await EmployeeDao.listLocalID(listEmployeeLocalId, listI)
                if (getEmployeeItem) {
                    if (getEmployeeItem.length === 1) {
                        const employeeItem: AdminEditEmployeeDataType = {
                            username: getEmployeeItem[0].username || "",
                            companyId: getEmployeeItem[0].companyID || "",
                            email: getEmployeeItem[0].email || "",
                            firstName: getEmployeeItem[0].firstName || "",
                            grade: getEmployeeItem[0].grade || "",
                            groupId: getEmployeeItem[0].employeeGroupLocalId || "",
                            isAdminValue: getEmployeeItem[0].isCompanyAdmin === true ? "true" : "false",
                            lastName: getEmployeeItem[0].lastName || "",
                            localId: getEmployeeItem[0].localID || "",
                            managerValue: String(getEmployeeItem[0].manager),
                            superior: getEmployeeItem[0].superiorUsername || "",
                            isDeleted: getEmployeeItem[0].isDeleted || BooleanType.FALSE,
                        }
                        setEmployee(employeeItem)
                    } else {
                        setError("社員番号が重複しています")
                        console.error("社員番号が重複しています")
                    }
                } else {
                    setError("社員情報の取得に失敗しました")
                    console.error("社員情報の取得に失敗しました")
                }
            }

        })()
    }, [currentUser])

    return (
        employee ?
            <EmployeeEdit
                header={header}
                sidebar={sidebar}
                groups={groups}
                superiors={superiors}
                employee={employee}
                isAdmin={MockData.isAdmin}
                manager={MockData.manager}
            /> : null
    )
}