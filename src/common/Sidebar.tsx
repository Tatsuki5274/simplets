import { Auth } from 'aws-amplify';
import React, { CSSProperties, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './sidebarStyle.module.scss'

function SidebarComponents() {

    //ユーザ情報取得
    //const groups: string[] = ["test","test2"];

    const [isManager, setIsManager] = useState<boolean>();
    useEffect(() => {
        ; (async () => {
            try {
                const groups: string[] = [""];
                const currentUser = await Auth.currentAuthenticatedUser()
                console.log("currentUser", currentUser)
                const currentUserGroups = currentUser.signInUserSession.idToken.payload["cognito:groups"];

                for (let i = 0; i < currentUserGroups.length; i++) {
                    groups[i] = currentUserGroups[i];
                    console.log(groups[i]);
                }
                console.log(groups);


                // admin,managerが含まれているか確認
                for (let i = 0; i < groups.length; i++) {
                    if (groups[i].indexOf('Admin') >= 0 || groups[i].indexOf('Manager') >= 0) {
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