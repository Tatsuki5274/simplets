import React, { useState, useEffect, ChangeEvent } from 'react';
import { Container, InputGroup, Table, FormControl, Form, Button, DropdownButton, Dropdown, Modal } from 'react-bootstrap';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api";
// import DropdownItem from 'react-bootstrap/esm/DropdownItem';
import { RouteComponentProps } from 'react-router';
import { Sheet, Section, Objective, Employee } from 'App';
import { GetSheetQuery, ListSheetsQuery } from 'API';
import { sendEmail, updateObjective, updateSheet } from 'graphql/mutations';
import * as APIt from 'API';
import { listSheets, getSheet } from 'graphql/queries';
import dateFormat from 'dateformat';
import HeaderComponents from 'common/header';
import style from './detailStyle.module.scss';
import * as statusManager from 'lib/statusManager'
import ApprovalStatusBox from 'common/approvalStatusBox';
import { Link } from 'react-router-dom';
import { Formik, useFormik } from 'formik';

//propsの型を指定
type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}

function EvalutionScreen(props: Props) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const sheetId = props.match.params.sheetId;

    // sheet 情報取得
    const [sheet, setSheet] = useState<Sheet>()

    useEffect(() => {
        ; (async () => {
            //const sheetId = props.match.params.sheetId;

            const input: APIt.GetSheetQueryVariables = {
                id: sheetId
            }
            let response;
            try {
                response = (await API.graphql(graphqlOperation(getSheet, input))
                ) as GraphQLResult<GetSheetQuery>;
            } catch (e) {
                console.log("エラーを無視しています", e)
                response = e;
            }
            const sheetItem: Sheet = response.data?.getSheet as Sheet;
            setSheet(sheetItem);
        })()
    }, []);


    function HandleUpdateStatus() {
        // (async()=>{
        // //ステータスを「目標：設定中」に変更
        // const updateI: APIt.UpdateSheetInput = 
        // {id:sheetId, status: 'c5c847a3-e919-4133-89c5-747049c4a050'};
        // const updateMV: APIt.UpdateSheetMutationVariables = {
        //     input: updateI,
        // };
        // const updateR: GraphQLResult<APIt.UpdateSheetMutation> = 
        // await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;

        // if (updateR.data) {
        //     const updateTM: APIt.UpdateSheetMutation = updateR.data;
        //     if (updateTM.updateSheet) {
        //         const sheet: Sheet = updateTM.updateSheet;
        //         console.log('UpdateSheet:', sheet);
        //     }
        // }})()
        handleClose();
    }

    async function handleClickStatusRemand() {
        // if(sheet){
        //     let updatedSheet = await updateSheetInput();
        //     if(updatedSheet){
        //         updatedSheet = await statusManager.exec(updatedSheet, "remand");
        //         setSheet(updatedSheet);
        //     }else{
        //         console.error("フォームデータの登録に失敗しました")
        //     }
        // }else{
        //     console.error("sheetの読み込みに失敗しています")
        // }
        
        //差し戻しメッセージをメールに指定する処理を実装する

        handleClose();
    }


    async function runUpdateSheet(sheet: Sheet): Promise<Sheet | undefined> {
        const updateI: APIt.UpdateSheetInput = {
            id: sheetId,
            careerPlanComment: sheet.careerPlanComment,
            firstComment: sheet.firstComment,
            secondComment: sheet.secondComment,
            overAllEvaluation: parseInt(sheet.overAllEvaluation as unknown as string),
            interviewPlanComment: sheet.interviewPlanComment,
            interviewPlanDate: sheet.interviewPlanDate,
            InterviewMid1Comment: sheet.InterviewMid1Comment,
            InterviewMid1Date: sheet.InterviewMid1Date,
            InterviewMid2Comment: sheet.InterviewMid2Comment,
            InterviewMid2Date: sheet.InterviewMid2Date,
            InterviewMid3Comment: sheet.InterviewMid3Comment,
            InterviewMid3Date: sheet.InterviewMid3Date,
        }
        const updateMV: APIt.UpdateSheetMutationVariables = {
            input: updateI,
        };
        let updateR: GraphQLResult<APIt.UpdateSheetMutation>
        try{
            updateR = await API.graphql(graphqlOperation(updateSheet, updateMV)) as GraphQLResult<APIt.UpdateSheetMutation>;
        }catch(e){
            console.log("エラーを無視しています", e);
            updateR = e;
        }
        if (updateR.data) {
            const updateTM: APIt.UpdateSheetMutation = updateR.data;
            if (updateTM.updateSheet) {
                const updatedSheet: Sheet = updateTM.updateSheet;
                console.log('UpdateSheet:', updatedSheet);
                return updatedSheet;
            }
        }
    }


    // lastEvalutation 更新
    async function handleChangeObjective(event: any) {

        // ObjectiveId 取得
        console.log(event.target.getAttribute('data-objective-id'));
        const objectiveId = event.target.getAttribute('data-objective-id');

        // lastEvaluation value 取得
        console.log(event.currentTarget.value);
        const objectiveLastEvaluation = parseInt(event.currentTarget.value);

        const updateI: APIt.UpdateObjectiveInput = {
            id: objectiveId,
            lastEvaluation: objectiveLastEvaluation,
        };
        const updateMV: APIt.UpdateObjectiveMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateObjectiveMutation> =
            await API.graphql(graphqlOperation(updateObjective, updateMV)) as GraphQLResult<APIt.UpdateObjectiveMutation>;
        console.log("updateR", updateR);
        console.log("sheet", sheet)
    }




    if (sheet === undefined) return <div>Loading...</div>
    else if (sheet === null) {
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
    }

    // submitの動作を指定
    let onSubmit;
    if(sheet.statusValue === 2 || sheet.statusValue === 10 || sheet.statusValue === 12 || sheet.statusValue === 13){
        onSubmit = async (values: Sheet) => {
            console.log("onSubmit", values)
            if(sheet){
                let updatedSheet = await runUpdateSheet(values);
                if(updatedSheet){
                    updatedSheet = await statusManager.exec(updatedSheet, "proceed");
                    setSheet(updatedSheet);
                }else{
                    console.error("フォームデータの登録に失敗しました")
                }
            }else{
                console.error("sheetの読み込みに失敗しています")
            }
        }
    }else if(sheet.statusValue === 2 || sheet.statusValue === 3 || sheet.statusValue === 10 || sheet.statusValue === 12){
        onSubmit = async (values: Sheet) => {
            // 呼び出されない
            console.log("onSubmit", values)
        }
    }
    else{
        return <p>不正な承認ステータスです({sheet.statusValue})</p>
    }

    //カテゴリ情報のnoを元に昇順でソート
    const sectionItems = sheet.section?.items as Section[];
    sectionItems?.sort(function (a, b) {
        if (a?.category?.no! > b?.category?.no!) {
            return 1;
        } else {
            return -1;
        }
    });
    return (
        <div>

            {/* モーダルウィンドウ 差し戻しコメント */}
            <div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>目標差し戻し</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <InputGroup>
                            <InputGroup.Prepend>
                                <InputGroup.Text>理由</InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl as="textarea" />
                        </InputGroup>
                    </Modal.Body>
                    <Modal.Footer>
                        {/* <Button variant="primary" onClick={handleClose}> */}
                        <Button variant="primary" onClick={handleClickStatusRemand}>
                            差し戻し
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            キャンセル
                        </Button>

                    </Modal.Footer>
                </Modal>

            </div>

            {/* 評価画面 */}
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            <div>
                <Container>
                    <Link to={`/reviewer/list`} >
                        <Button >戻る</Button>
                    </Link>
                    <ApprovalStatusBox statusValue={sheet.statusValue || -1}/>
                    <h3>今後のキャリア計画</h3><br />

                    <Formik
                        initialValues={{
                            careerPlanComment: sheet.careerPlanComment,
                            firstComment: sheet.firstComment,
                            secondComment: sheet.secondComment,
                            overAllEvaluation: sheet.overAllEvaluation,
                            interviewPlanComment: sheet.interviewPlanComment,
                            interviewPlanDate: sheet.interviewPlanDate,
                            InterviewMid1Comment: sheet.InterviewMid1Comment,
                            InterviewMid1Date: sheet.InterviewMid1Date,
                            InterviewMid2Comment: sheet.InterviewMid2Comment,
                            InterviewMid2Date: sheet.InterviewMid2Date,
                            InterviewMid3Comment: sheet.InterviewMid3Comment,
                            InterviewMid3Date: sheet.InterviewMid3Date,
                        } as Sheet}
                        onSubmit={onSubmit}
                    >
                       {props => (
                            <form onSubmit={props.handleSubmit}>
                                <h4>本人希望</h4>

                                {/* 本人希望　情報表示 */}
                                <p>{sheet.careerPlan}</p>


                                <h4>話し合い結果</h4>
                                <textarea 
                                    className={style.detailTextarea}
                                    name="careerPlanComment"
                                    onChange={props.handleChange}
                                >
                                    {sheet.careerPlanComment}
                                </textarea>

                                {/* インタビュー実施記録 */}
                                <h4>インタビュー実施記録</h4>
                                <Table bordered>
                                    <thead>
                                        <tr>
                                            <td>目的</td>
                                            <td>実施日時</td>
                                            <td>内容</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* インタビュー実施記録　情報表示 */}
                                        <tr>
                                            <td>目標設定</td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="interviewPlanDate"
                                                    onChange={props.handleChange}
                                                    defaultValue={sheet.interviewPlanDate || ""}
                                                />
                                            </td>
                                            {/* <td>{dateFormat(new Date(sheet.interviewPlanDate || ""), "yyyy/mm/dd")}</td> */}
                                            <td>
                                                <textarea
                                                    className={style.detailTextarea}
                                                    name="interviewPlanComment" 
                                                    onChange={props.handleChange}
                                                >
                                                    {sheet.interviewPlanComment}
                                                </textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>中間#1</td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="InterviewMid1Date"
                                                    onChange={props.handleChange}
                                                    defaultValue={sheet.InterviewMid1Date || ""}
                                                />
                                            </td>
                                            {/* <td>{dateFormat(new Date(sheet.InterviewMid1Date || ""), "yyyy/mm/dd")}</td> */}
                                            <td>
                                                <textarea
                                                    className={style.detailTextarea}
                                                    name="InterviewMid1Comment" 
                                                    onChange={props.handleChange}
                                                >
                                                    {sheet.InterviewMid1Comment}
                                                </textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>中間#2</td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="InterviewMid2Date"
                                                    onChange={props.handleChange}
                                                    defaultValue={sheet.InterviewMid2Date || ""}
                                                />
                                            </td>
                                            {/* <td>{dateFormat(new Date(sheet.InterviewMid2Date || ""), "yyyy/mm/dd")}</td> */}
                                            <td>
                                                <textarea
                                                    className={style.detailTextarea}
                                                    name="InterviewMid2Comment" 
                                                    onChange={props.handleChange}
                                                >
                                                    {sheet.InterviewMid2Comment}
                                                </textarea>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>中間#3</td>
                                            <td>
                                                <input
                                                    type="date"
                                                    name="InterviewMid3Date"
                                                    onChange={props.handleChange}
                                                    defaultValue={sheet.InterviewMid3Date || ""}
                                                />
                                            </td>
                                            {/* <td>{dateFormat(new Date(sheet.InterviewMid3Date || ""), "yyyy/mm/dd")}</td> */}
                                            <td>
                                                <textarea
                                                    className={style.detailTextarea}
                                                    name="InterviewMid3Comment" 
                                                    onChange={props.handleChange}
                                                >
                                                    {sheet.InterviewMid3Comment}
                                                </textarea>
                                            </td>
                                        </tr>
                                    </tbody>

                                </Table><br />

                                {/* 年度評価 */}
                                <h4>年度評価</h4>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>所属長コメント</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className={style.detailTextarea}
                                            onChange={props.handleChange}
                                            name="secondComment"
                                            defaultValue={sheet.secondComment || ""}>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>総合評価</Form.Label>
                                        <Form.Control
                                            onChange={props.handleChange}
                                            name="overAllEvaluation"
                                            as="select">
                                            <option></option>
                                            <option>5</option>
                                            <option>4</option>
                                            <option>3</option>
                                            <option>2</option>
                                            <option>1</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Label>部門長コメント</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            className={style.detailTextarea}
                                            onChange={props.handleChange}
                                            name="firstComment"
                                            defaultValue={sheet.firstComment || ""}>
                                        </Form.Control>
                                    </Form.Group>

                                    {/* ステータスによってボタンの出し分け */}
                                    <Form.Group>
                                        <Button onClick={async ()=>{
                                            const updatedSheet = runUpdateSheet(props.values);
                                            if(updatedSheet){
                                                console.log("保存成功")
                                            }else{
                                                console.error("保存失敗", updatedSheet)
                                            }
                                        }}>保存</Button>
                                        {/* 承認ステータスが2または10の時に「保存して承認」ボタンを表示 */}
                                        {(() => {
                                            if (sheet.statusValue === 2 || sheet.statusValue === 10) {
                                                return (
                                                    <span>
                                                        <Button type="submit">保存して承認</Button>
                                                    </span>
                                                )
                                            }
                                        })()}
                                        {/* 承認ステータスが2か3か10か12の時に「差し戻し」ボタンを表示 */}
                                        {(() => {
                                            if (sheet.statusValue === 2 || sheet.statusValue === 3 || sheet.statusValue === 10 || sheet.statusValue === 12) {
                                                return (
                                                    <span>
                                                        <Button onClick={handleShow}>差し戻し</Button>
                                                    </span>
                                                )
                                            }
                                        })()}
                                        {/* 承認ステータスが12かつ部門長が存在すれば「部門長承認依頼」ボタン、部門長が存在しなければ「最終承認」ボタンを表示 */}
                                        {(() => {
                                            if (sheet.statusValue === 12) {
                                                if (sheet.revieweeEmployee?.superior?.superior?.superior) {
                                                    return (
                                                        <span>
                                                            <Button type="submit">部門長承認依頼</Button>
                                                        </span>
                                                    )
                                                } else {
                                                    return (
                                                        <span>
                                                            <Button type="submit">最終承認</Button>
                                                        </span>
                                                    )
                                                }
                                            }
                                        })()}
                                        {/* 承認ステータスが13の時に「最終承認」ボタンを表示 */}
                                        {(() => {
                                            if (sheet.statusValue === 13) {
                                                return (
                                                    <span>
                                                        <Button type="submit">最終承認</Button>
                                                    </span>
                                                )
                                            }
                                        })()}                                
                                    </Form.Group>
                                </Form><br />

                                {/* 目標コンポーネント */}
                                {sectionItems.map((section: Section) => {

                                    //項目明細情報の作成日を元に昇順へソート
                                    const objectiveItems = section?.objective?.items as Objective[];
                                    objectiveItems?.sort(function (a, b) {
                                        if (a.createdAt > b.createdAt) {
                                            return 1;
                                        } else {
                                            return -1;
                                        }
                                    });
                                    
                                    return (
                                        <div key={section.id}>
                                            <h4>{section.category?.name}</h4>
                                            <Table bordered>
                                                <thead>
                                                    <tr>
                                                        <td>目標</td>
                                                        <td>実績</td>
                                                        <td>進捗率</td>
                                                        <td>優先順位</td>
                                                        <td>自己評価</td>
                                                        <td>最終評価</td>
                                                        <td>更新日時</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {objectiveItems.map((objective: Objective) => {
                                                        const date = new Date(objective.updatedAt);
                                                        var styleObjective: string;
                                                        if (objective.progress === 100) {
                                                            styleObjective = style.detailObjectiveProgressHigh;
                                                        } else if (objective.progress! >= 10 && objective.progress! < 100) {
                                                            styleObjective = style.detailObjectiveProgressMiddle;
                                                        } else {
                                                            styleObjective = "";
                                                        }
                                                        return (
                                                            <tr key={objective.id} className={styleObjective}>

                                                                {/* 目標本文 */}
                                                                <td>{objective.content}</td>

                                                                {/* 実績 */}
                                                                <td>{objective.result}</td>

                                                                {/* 進捗率 */}
                                                                <td>{objective.progress}</td>

                                                                {/* 優先順位 */}
                                                                <td>{objective.priority}</td>

                                                                {/* 自己評価 */}
                                                                <td>{objective.selfEvaluation}</td>

                                                                {/* 最終評価 */}
                                                                <td className={style.detailSelect}>
                                                                    <select name="lastEvaluation" data-objective-id={objective.id} onChange={handleChangeObjective}>
                                                                        <option value=""></option>
                                                                        {[5, 4, 3, 2, 1].map((number: number) => {
                                                                            if (number === objective.lastEvaluation) {
                                                                                return (
                                                                                    <option selected value={number}>{number}</option>
                                                                                );

                                                                            } else {
                                                                                return (
                                                                                    <option value={number}>{number}</option>
                                                                                );
                                                                            }
                                                                        })}

                                                                    </select>
                                                                </td>

                                                                {/* 更新日時 */}
                                                                <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
                                                            </tr>
                                                        )
                                                    })}
                                                </tbody>
                                            </Table>
                                        </div>
                                    )
                                })}

                            </form>
                        )}
                    </Formik>

                </Container>
            </div>

        </div>
    );
}

export default EvalutionScreen;
