import { EmployeeType } from "API";
import { ErrorContext, HeaderContext, SidebarContext, UserContext } from "App";
import { listEmployees, listGroups } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import React, { useContext, useEffect, useState } from "react";
import { SelectLabel } from "views/components/atoms/Types";
import { AdminEmployeeDataType } from "views/components/organisms/admin/employee/AdminListEmployee";
import AdminEmployeeList from "views/components/templates/admin/employee/AdminEmployeeList";
import * as APIt from 'API';
import { EmployeeDao } from "lib/dao/employeeDao";
import { routeBuilder } from "router";

export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)

    const [groups, setGroups] = useState<SelectLabel[] | null>(null)
    const [tableData, setTableData] = useState<(AdminEmployeeDataType | null)[] | null>(null);
    const [initTableData, setInitTableData] = useState<(AdminEmployeeDataType | null)[] | null>(null);

    const currentUser = useContext(UserContext);
    const setError = useContext(ErrorContext)

    const mockData = {
        link: {
            label: "社員登録",
            dest: routeBuilder.adminEmployeeNewPath(),
        },
    }

    useEffect(() => {
        // 社員情報の取得
        (async () => {
            if (currentUser) {
                const companyID = currentUser.attributes["custom:companyId"]
                const listQV: APIt.ListEmployeesQueryVariables = {
                    companyID: companyID,
                };
                const employees = await EmployeeDao.list(listEmployees, listQV);
                console.log("employees", employees)
                if (employees) {
                    const obj: (AdminEmployeeDataType | null)[] = employees.map(employee => {
                        let ret: (AdminEmployeeDataType | null) = null
                        let link = {
                            label: "",
                            dest: "",
                        }
                        link = { 
                            label: "変更",
                            dest: employee.localID ? routeBuilder.adminEmployeeEditPath(employee.localID) : ""
                         } 

                        if (employee.email && employee.localID && employee.group && employee.group.name && employee.employeeGroupLocalId) {
                            ret = {
                                link: link,
                                mailAddress: employee.email,
                                employeeName: `${employee.lastName} ${employee.firstName}`,
                                employeeLocalId: employee.localID,
                                groupName: employee.group?.name,
                                groupId: employee.employeeGroupLocalId,
                                superior: {
                                    employeeLocalId: employee.superior?.localID || "",
                                    lastName: employee.superior?.lastName || "",
                                    firstName: employee.superior?.firstName || "",
                                },
                                isAdmin: employee.isCompanyAdmin ? employee.isCompanyAdmin : false,
                                manager: employee.manager || EmployeeType.NORMAL
                            }
                        }
                        return ret
                    })

                    obj.sort(function (a, b) {
                        if (a && b) {
                            if (a.employeeLocalId > b.employeeLocalId) return 1
                            if (a.employeeLocalId < b.employeeLocalId) return -1
                        }
                        return 0
                    })

                    setInitTableData(obj)
                    setTableData(obj)
                } else {
                    setError("社員情報の取得に失敗しました")
                    console.error("社員情報の取得に失敗しました")
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
                    const groupAll: SelectLabel[] = [
                        {
                            label: "全て",
                            value: "all"
                        }
                    ]
                    const groupsLabel: SelectLabel[] = groups.map(group => {
                        return {
                            label: group.name || "",
                            value: group.localID || ""
                        }
                    })
                    setGroups(groupAll.concat(groupsLabel))
                } else {
                    setError("部署情報の取得に失敗しました")
                    console.error("部署情報の取得に失敗しました")
                }
            }
        })()
    }, [currentUser])

    return (
        <>
            <AdminEmployeeList
                header={header}
                sidebar={sidebar}
                tableData={tableData}
                setTableData={setTableData}
                initTableData={initTableData}
                groups={groups}
                link={mockData.link}
            />
        </>
    )
}