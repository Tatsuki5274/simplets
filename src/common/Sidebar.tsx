import React from 'react';
import Amplify, { Auth } from 'aws-amplify';
import Sidebar from 'react-sidebar';
import { Link } from 'react-router-dom';

function SidebarComponents() {
    // const sidebarDocked = true;
    // // const sidebarOpen = false; 
    // // const sidebarTransitions = true;
    return (
        // サイドバーを表示
        <div>
            <Link to="/reviewee/list">業績評価一覧</Link><br />
            <Link to="/reviewer/list">進捗参照</Link>
        </div>        
    );
}

export default SidebarComponents;