import { HeaderContext, SidebarContext } from "App";
import React, { useContext } from "react";
import AdminEmployeeCreate from "views/components/templates/admin/employee/AdminEmployeeCreate";

const mockData = {
    groups: [
        {
            label: "EMS",
            value: "10"
        }, {
            label: "BIS",
            value: "20"
        },
        {
            label: "DX",
            value: "30"
        }, {

            label: "管理部",
            value: "40"
        }, {

            label: "営業部",
            value: "50"
        },
    ],
    superiors: [
        {
            label: "EMS テスト1",
            value: "001"
        }, {
            label: "BIS テスト2",
            value: "002"
        },
        {
            label: "DX テスト3",
            value: "003"
        }, {

            label: "管理部 テスト4",
            value: "004"
        }, {

            label: "営業部 テスト5",
            value: "005"
        },
    ],
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
            value: "10"
        }, {
            label: "所属長",
            value: "20"
        },
        {
            label: "部門長",
            value: "30"
        },
    ],
}

export default function () {
    const header = useContext(HeaderContext);
    const sidebar = useContext(SidebarContext)

    return (
        <AdminEmployeeCreate
            header={header}
            sidebar={sidebar}
            {...mockData}
        />
    )
}