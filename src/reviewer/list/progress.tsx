import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Table, Card, ToggleButton, ToggleButtonGroup, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, graphqlOperation } from 'aws-amplify';
import { listGroups, listSheets } from 'graphql/queries';
import { GetEmployeeQuery, ListGroupsQuery, ListSheetsQuery } from 'API';
import { GraphQLResult } from "@aws-amplify/api";
import * as APIt from 'API';
import { Group, Objective, Section, Sheet } from 'App';
import { getEmployee } from 'graphql/queries'
import SidebarComponents from 'common/Sidebar';


function ProgressReferenceList() {
    //今日の日付を取得
    const today: Date = new Date();
    const thisYear: number = today.getFullYear();
    let yearList: Array<number> = [];
    for (let step = 0; step < 10; step++) {
        yearList.push((thisYear - step));
    }

    const [sheets, setSheets] = useState<Sheet[]>();

    const [groupValue, setGroupValue] = useState([]);
    const handleChangeBottun = (val: any) => setGroupValue(val);
    console.log(groupValue)

    //選択する部署のデータを取得して昇順でソートして表示する機能
    const [groupList, setGroupList] = useState<Group[]>()
    useEffect(() => {
        ; (async () => {

            try {
                const groupList: APIt.ListGroupsQueryVariables = {
                }
                const response = (await API.graphql(graphqlOperation(listGroups, groupList))
                ) as GraphQLResult<ListGroupsQuery>;

                const groupItem = response.data?.listGroups?.items as Group[];
                //昇順でソートしてgroupItemに保存
                groupItem?.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    } else {
                        return -1;
                    }
                });
                setGroupList(groupItem);
                console.log(groupItem);
                console.log(response);
            } catch (e) {
                console.log(e);
            }

        })()
    }, []);

    //フォーム内で選択された部門と年度をformInputに保存する
    const [formInput, setFormInput] = useState<any>({ year: thisYear })
    function handleChange(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: string = target.name;

        setFormInput({
            ...formInput, [name]: value
        });
        console.log(formInput)

    }

    //選択された部門と年度によって各社員の進捗情報を抽出する
    async function handleClickSearch() {
        //部門の選択肢の中から「全て」が選択された場合
        if (formInput.groupId === "all") {
            const listQV: APIt.ListSheetsQueryVariables = { filter: { year: { eq: parseInt(formInput.year as string) } } };
            const response = await (API.graphql(graphqlOperation(listSheets, listQV))
            ) as GraphQLResult<ListSheetsQuery>;
            const listItems = response.data?.listSheets?.items;
            setSheets(listItems as Sheet[]);
            console.log(response);
            console.log(listItems);
            //部門の選択肢の中から「全て」以外が選択された場合
        } else {
            const listQV: APIt.ListSheetsQueryVariables = { filter: { sheetGroupId: { eq: formInput.groupId }, year: { eq: parseInt(formInput.year as string) } } };
            const response = await (API.graphql(graphqlOperation(listSheets, listQV))
            ) as GraphQLResult<ListSheetsQuery>;
            const listItems = response.data?.listSheets?.items;
            setSheets(listItems as Sheet[]);
            console.log(response);
            console.log(listItems);
        }
    }

    return (

        <div>
            {/* サイドバーコンポーネント 表示 */}
            <SidebarComponents />

            <Container>
                <h2>進捗参照</h2><br />
                {/* 部門の選択肢を表示 */}
                <InputGroup.Prepend>
                    <span>
                        <InputGroup.Radio value="all" name="groupId" onChange={handleChange} aria-label="Radio button for following text input" inline />
                        <span>全て</span>
                    </span>
                    {groupList?.map((group: Group) => {
                        return (
                            <span>
                                <InputGroup.Radio value={group.id} name="groupId" onChange={handleChange} aria-label="Radio button for following text input" inline />
                                <span>{group.name}</span>
                            </span>
                        )
                    }
                    )}
                </InputGroup.Prepend>


                <Form>
                    {/* 年度の選択肢を表示 */}
                    <Form.Group controlId="Form.Dropdown">
                        <Form.Label>年度</Form.Label>
                        <Form.Control as="select" onChange={handleChange} name="year">
                            {yearList.map((year: number) => {
                                return (
                                    <option value={year}>{year}</option>
                                )
                            })}
                        </Form.Control>
                    </Form.Group>

                    {/* 確認を表示 */}
                    <Form.Group>
                        <Button type="button" onClick={handleClickSearch}>確認</Button>
                    </Form.Group>

                </Form>
                <br />
                {/* 取得したシートの数だけ社員毎の進捗を表示 */}
                {sheets?.map((sheet: Sheet) => {
                    return (
                        <Card>
                            {/* 社員の姓名と部門名を表示 */}
                            <Card.Header>{sheet.revieweeEmployee?.lastName}{sheet.revieweeEmployee?.firstName}&nbsp;{sheet.group?.name}</Card.Header>
                            <Card.Body>
                                {/* セクション毎に進捗の平均を表示 */}
                                {sheet.section?.items?.map((arg: any) => {
                                    const section: Section = arg    //仮の型変換処理
                                    let sum = 0;
                                    {/* セクション内の全オブジェクトの進捗を合計 */ }
                                    section.objective?.items?.forEach((objective: any) => {
                                        sum += objective.progress;
                                    })
                                    let avg = 0;
                                    {/* オブジェクトの進捗の平均を表示 */ }
                                    if (section && section.objective && section.objective.items) {
                                        avg = Math.floor((sum / section.objective.items.length) as number);
                                    }
                                    {/* データがないcategoryの進捗の表示分け */ }
                                    if (isNaN(avg)) {
                                        return (
                                            <div>
                                                <td>{section.category?.name}&nbsp;</td><td>-</td><br />
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div>
                                                <td>{section.category?.name}&nbsp;</td><td>{avg}%</td><br />
                                            </div>
                                        )
                                    }
                                })}
                            </Card.Body>
                        </Card>
                    )
                })}

            </Container>
        </div>
    );
}

export default ProgressReferenceList;