import { Employee, UserContext } from 'App';
import React, { useContext, useEffect, useState } from 'react';
import * as APIt from 'API';
import  { API, graphqlOperation } from 'aws-amplify';
import { getEmployee } from 'graphql/queries';
import { GetEmployeeQuery } from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import style from './headerStyle.module.scss'
import { Navbar } from 'react-bootstrap';
import { AmplifySignOut } from '@aws-amplify/ui-react';



function HeaderComponents() {    
    //所属する部署と社員名のデータを取得
    const [employee, setEmployee] = useState<Employee>()
    const currentUser = useContext(UserContext);
    
    //ログインユーザーデータ格納      
    useEffect(() => {
        ; (async () => {

            if(currentUser){
                try {
                    console.log("currentUser", currentUser)

                    const employee: APIt.GetEmployeeQueryVariables = {
                        username: currentUser?.username || "",
                        companyID: currentUser?.attributes['custom:companyId'] || ""
                    }
                    let response: GraphQLResult<GetEmployeeQuery>
                    try{
                        response = (await API.graphql(graphqlOperation(getEmployee, employee))
                        ) as GraphQLResult<GetEmployeeQuery>;
                    }catch(e){
                        console.log(e);
                        response = e;
                    }

                    const employeeItem = response.data?.getEmployee as Employee;
                    setEmployee(employeeItem);
                } catch (e) {
                    console.error(e);
                }
            }

        })()
    }, [currentUser]);


    //ヘッダー表示
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>業績評価システム</Navbar.Brand>
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