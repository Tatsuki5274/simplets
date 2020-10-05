import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import Sidebar from 'react-sidebar';

function SidebarComponents() {
    return (
        // サイドバーを表示
        <Sidebar>
            <a href="/reviewee/list">業績評価一覧</a><br />
            <a href="/reviewer/list">進捗参照</a>
        </Sidebar>
    );
}

export default SidebarComponents;