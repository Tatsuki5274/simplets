import React from 'react';
import { Link } from 'react-router-dom';
import style from './sidebarStyle.module.scss'

function SidebarComponents() {
    // const sidebarDocked = true;
    // // const sidebarOpen = false; 
    // // const sidebarTransitions = true;
    return (
        // サイドバーを表示
        <div>
            <Link className={style.sidebarContents} to="/reviewee/list">業績評価一覧</Link><br />
            <Link className={style.sidebarContents} to="/reviewer/list">進捗参照</Link>
        </div>        
    );
}

export default SidebarComponents;