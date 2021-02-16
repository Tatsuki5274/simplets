import { EmployeeContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import style from './headerStyle.module.scss'
import { Navbar } from 'react-bootstrap';
import { AmplifySignOut } from '@aws-amplify/ui-react';
import HeaderLogo from 'views/components/organisms/common/HeaderLogo';
import { Employee } from 'API';



function HeaderComponents() {    
    //所属する部署と社員名のデータを取得
    const [employee, setEmployee] = useState<Employee>()
    // const currentUser = useContext(UserContext);
    const currentEmployee = useContext(EmployeeContext);
    
    //ログインユーザーデータ格納      
    useEffect(() => {
        ; (async () => {

            if(currentEmployee) {
            setEmployee(currentEmployee)
            }

        })()
    }, [currentEmployee]);


    //ヘッダー表示
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand><HeaderLogo/></Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className={style.headerContents}>{employee?.company?.name}</Navbar.Text>
                <Navbar.Text className={style.headerContents}>{employee?.group?.name}</Navbar.Text>
                <Navbar.Text className={style.headerContents}>{employee?.lastName}{employee?.firstName}</Navbar.Text>
                <AmplifySignOut button-text="ログアウト"></AmplifySignOut>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default HeaderComponents;