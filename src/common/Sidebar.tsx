import { EmployeeType } from 'API';
import { UserContext } from 'App';
import { getEmployee } from 'graphql/queries';
import { EmployeeDao } from 'lib/dao/employeeDao';
import React, { CSSProperties, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './sidebarStyle.module.scss'

function SidebarComponents() {

    const [isManager, setIsManager] = useState<boolean>();

    //ユーザ情報取得
    const currentUser = useContext(UserContext);
    useEffect(() => {
        ; (async () => {
            try {
                if (currentUser) {
                    const employeeItem = await EmployeeDao.get(getEmployee, { companyID: currentUser.attributes["custom:companyId"], username: currentUser.username })

                    // SUPER_MANAGER,MANAGERが含まれているか確認
                    if(employeeItem && (employeeItem.manager === 'MANAGER' as EmployeeType || employeeItem.manager === 'SUPER_MANAGER' as EmployeeType)) {
                        setIsManager(true);
                    }
                }
            } catch (e) {
                console.log(e);
            }

        })()
    }, []);
    // サイドバーを表示
    return (
        <div style={boxStyle}>
            <Link className={style.sidebarContents} to="/reviewee/list">業績評価一覧</Link><br />

            {/* 進捗参照 表示条件 */}
            {isManager? <Link className={style.sidebarContents} to="/reviewer/list">進捗参照</Link>: ""}

        </div>
    );
}

export default SidebarComponents;

export function RevieweeSidebar(){
    return (
        <div style={boxStyle}>
            <Link to="/reviewee/list">業績評価一覧</Link>
        </div>
    )
}

const boxStyle: CSSProperties = {
    position: "sticky",
    top: "100px",
}
export const sidebarBackgroundColor: CSSProperties = {
    backgroundColor: "#8080804d",
}

export const performanceSidebarBackgroundColor: CSSProperties = {
    backgroundColor: "#8080804d",
    minHeight: "100vh"
}