import { Employee } from 'App';
import React, { useEffect, useState } from 'react';
import * as APIt from 'API';
import  {  API, Auth, graphqlOperation } from 'aws-amplify';
import { getEmployee } from 'graphql/queries';
import { GetEmployeeQuery } from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import style from './headerStyle.module.scss'
import { Button, Navbar } from 'react-bootstrap';



function HeaderComponents() {    
    //所属する部署と社員名のデータを取得
    const [employee, setEmployee] = useState<Employee>()
    
    
    //ログインユーザーデータ格納      
    useEffect(() => {
        ; (async () => {

            try {
                const currentUser = await Auth.currentAuthenticatedUser()
                console.log("currentUser", currentUser)

                const employee: APIt.GetEmployeeQueryVariables = {
                    id: currentUser.username
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
                console.log(employeeItem);
                console.log(response);
            } catch (e) {
                console.log(e);
            }

        })()
    }, []);

    function signOut() {
        // const { onStateChange } = this.props;
          Auth.signOut();
    }

    //ヘッダー表示
    return (
        <Navbar bg="dark" variant="dark" sticky="top">
            <Navbar.Brand>業績評価システム</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text className={style.headerContents}>{employee?.company?.name}</Navbar.Text>
                <Navbar.Text className={style.headerContents}>{employee?.group?.name}</Navbar.Text>
                <Navbar.Text className={style.headerContents}>{employee?.lastName}{employee?.firstName}</Navbar.Text>
                <Button onClick={signOut}>ログアウト</Button>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default HeaderComponents;