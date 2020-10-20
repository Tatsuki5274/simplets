import { Auth } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import style from './sidebarStyle.module.scss'

function SidebarComponents() {

    //ユーザ情報取得
    //const groups: string[] = ["test","test2"];

    const groups: string[] = [""];
    const [isManager, setIsManager] = useState<boolean>();
    useEffect(() => {
        ; (async () => {
            try {
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
        <div>
            <Link className={style.sidebarContents} to="/reviewee/list">業績評価一覧</Link><br />

            {/* 進捗参照 表示条件 */}
            {isManager? <Link className={style.sidebarContents} to="/reviewer/list">進捗参照</Link>: ""}

        </div>
    );
}

export default SidebarComponents;

export function RevieweeSidebar(){
    return (
        <div>
            <Link to="/reviewee/list">一覧画面</Link>
        </div>
    )
}