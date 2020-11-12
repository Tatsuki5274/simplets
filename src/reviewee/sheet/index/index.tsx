import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Table, Button, Modal, Form, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { GraphQLResult } from "@aws-amplify/api";
import { API, graphqlOperation } from 'aws-amplify';
import { getSheet, listSheets } from 'graphql/queries'
import { Sheet, Section, Objective, SendEmail, UserContext } from 'App';
import * as APIt from 'API';
import dateFormat from 'dateformat'
import {  deleteObjective, updateObjective, updateSheet }
    from 'graphql/mutations';
import HeaderComponents from 'common/header';//ヘッダーの表示
import Style from './indexStyle.module.scss';
import ApprovalStatusBox from 'common/approvalStatusBox';
import { RevieweeSidebar } from 'common/Sidebar';
import { Formik } from 'formik';
import { Command, commandWorkFlow } from 'lib/workflow';
import { SheetDao } from 'lib/dao/sheetDao';
import { sendEmailMutation } from 'lib/sendEmail';
import { ArcGauge } from '@progress/kendo-react-gauges';
import { inputFieldStyle } from 'common/inputFieldStyle.module.scss';
import { ObjectiveDao } from 'lib/dao/objectiveDao';

type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}

type Avg = {
    sheetAvg: number,
    sections: {
        sectionId?: string,
        avg: number
    }[] | null
}

function RevieweeSheetShow(props: Props) {
    
    const sheetId = props.match.params.sheetId;
    const currentUser = useContext(UserContext);

    const [sheet, setSheet] = useState<Sheet>();
    const [sheetAvg, setSheetAvg] = useState<Avg>()
    const [previousPeriod, setPreviousPeriod] = useState<(number | null)[]>([null, null])

    const [modalObjective, setModalObjective] = useState<Objective>();

    //モーダル
    const [objectiveUpdateShow, setObjectiveUpdateShow] = useState(false);
    const handleCloseObjectiveUpdate = () => setObjectiveUpdateShow(false);
    const handleShowObjectiveUpdate = () => setObjectiveUpdateShow(true);

    const [careerPlanUpdateShow, setCareerPlanUpdateShow] = useState(false);
    const handleCloseCareerPlanUpdate = () => setCareerPlanUpdateShow(false);
    const handleShowCareerPlanUpdate = () => setCareerPlanUpdateShow(true);


    const [changeObjectiveId, setObjectiveId] = useState<Array<any> | any>();
    function HandleChange(event: any) {
        console.log(event.target.getAttribute('data-objectiveId'));
        const objectiveId: string = event.target.getAttribute('data-objectiveId');
        setObjectiveId(objectiveId);

        let filteredObjective: Array<Objective>;
        for(let i=0;i<sectionItems.length;i++){
//        sectionItems.forEach((sections:Section) => {
            const modalObjectiveItems = sectionItems[i].objective?.items as Objective[];
            filteredObjective = modalObjectiveItems.filter((element)=>{
                return element.id === objectiveId ? true : false
            })
            console.log("filter", filteredObjective)
            const result = {...filteredObjective[0]};
            setModalObjective(result);
            if(filteredObjective.length > 0) {
                break;
            }
    
        } 
        handleShowObjectiveUpdate();

    }

    // Progress 更新
    async function handleChangeProgress(event: any) {
        // console.log(event.target.getAttribute('data-objective-id'));
        const objectiveId = event.target.getAttribute('data-objective-id');
        // console.log(event.currentTarget.value);
        const objectiveProgress = parseInt(event.currentTarget.value);

        if (objectiveProgress >= 0 && objectiveProgress <= 100) {
            const updateI: APIt.UpdateObjectiveInput = {
                id: objectiveId,
                progress: objectiveProgress,
            };

            const updateMV: APIt.UpdateObjectiveMutationVariables = {
                input: updateI,
            };
            let updateR: GraphQLResult<APIt.UpdateObjectiveMutation>
            try {
                updateR =
                    await API.graphql(graphqlOperation(updateObjective, updateMV)) as GraphQLResult<APIt.UpdateObjectiveMutation>;
            } catch (e) {
                console.log("エラーを無視しています", e)
                updateR = e;
            }
        }
    }


    const [formInputCareerPlan, setFormInputCareerPlan] = useState<any>();
    function handleChangeCareerPlan(event: any) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name: string = target.name;

        setFormInputCareerPlan({
            ...formInputCareerPlan, [name]: value
        });
    }
    async function HandleUpdateCareerPlan(e: any) {
        if(formInputCareerPlan && formInputCareerPlan.careerPlan){
            const updateI: APIt.UpdateSheetInput = {
                id: sheetId,
                careerPlan: formInputCareerPlan.careerPlan || ""
            };
            const updatedSheet = await SheetDao.update(updateSheet, updateI)
    
            if (updatedSheet) {
                setSheet({...updatedSheet})
            }
        }

        handleCloseCareerPlanUpdate()
    }

    async function afterWorkFlow(sheet: Sheet, work:{sheet: Sheet, mailObject: SendEmail | null}){
        let updatedSheet = await SheetDao.update(updateSheet, {
            careerPlan: formInputCareerPlan ? formInputCareerPlan.careerPlan || "" : "",
            id: sheet.id,
            statusValue: sheet.statusValue
        });

        if(updatedSheet){
            setSheet({...(updatedSheet)})
            if(work.mailObject){
                sendEmailMutation(work.mailObject)
            }else{
                console.error("メールの作成に失敗しました")
            }
        }else{
            console.error("フォームデータの登録に失敗しました")
        }
    }

    //objectiveの削除
    async function handleDeleteObjective(event: any) {
        if(window.confirm("目標を削除しますか？")){
            console.log(event.target.getAttribute('data-objective-id'));
            const objectiveId = event.target.getAttribute('data-objective-id');
    
            const deleteI: APIt.DeleteObjectiveInput = {
                id: objectiveId
            };
            const deletedObjective = await ObjectiveDao.delete(deleteObjective, deleteI)
    
            if(sheet && sheet.section && sheet.section.items){
                sheet.section.items.forEach(section => {
                    if(section && section.objective && section.objective.items){
                        section.objective.items = section.objective.items.filter(objective => {
                            if(objective){
                                return objective.id !== objectiveId
                            }
                            return false
                        })
                    }
                })
                const newSheet = {...sheet}
                setSheet(newSheet)
            }
    
            console.log("delete", deletedObjective)
        }

    }

    //目標変更検知
    function handleCheckObjectiveItems(inputItems: (string | null | undefined)[], objectiveItems: (string | null | undefined)[]) {
        for (let i = 0; i < inputItems.length; i++) {
            if (inputItems[i] !== undefined) {
                if (inputItems[i] !== objectiveItems[i]) {
                    // 承認ステータス更新処理を実行
                    console.log("項目変更を検知しました");
                    break;
                }
            }
        }
    }

    
    const arcColors = [
        {
            to: 25,
            color: '#0058e9'
        }, {
            from: 25,
            to: 50,
            color: '#f31700'
        }, {
            from: 50,
            to: 75,
            color: '#ffc000'
        }, {
            to: 75,
            color: '#00ffff'
        }, {
            to: 100,
            color: '#7fff00'
        }
    ];

    //表示用データ
    useEffect(() => {
        ; (async () => {
            const sheet = await SheetDao.get(getSheet, {id: sheetId})
            if(sheet){
                setSheet(sheet);
            }
        })()
    }, [sheetId]);

    useEffect(() => {
        ; (async () => {
            // 前期と前々期を取得
            if(sheet){
                const thisYear = sheet.year

                const input: APIt.ListSheetsQueryVariables = {
                    filter: {
                        year: {
                            between: [thisYear - 2, thisYear - 1]
                        },
                        reviewee:{
                            eq: currentUser.username
                        }
                    }
                }
                const gotSheets = await SheetDao.list(listSheets, input)

                if(gotSheets){
                    if(gotSheets.length > 2){
                        console.error("業績評価年度に重複があります。前期前々期の記録に想定されない値が格納される場合があります。", gotSheets)
                    }
                    let results: (number | null)[] = [null, null]

                    // 前期の記録を取得
                    results[0] = gotSheets.find((sheet)=>{
                        return sheet?.year === thisYear - 1
                    })?.overAllEvaluation || null
                    // 前々期の記録を取得
                    results[1] = gotSheets.find((sheet)=>{
                        return sheet?.year === thisYear - 2
                    })?.overAllEvaluation || null

                    setPreviousPeriod(results)
                }

            }
        })()
    }, [sheet, currentUser]);

    useEffect(() => {
        const getAvg = (nums: number[]) =>{
            let sum = 0;
            let cnt = 0;
            let ret = -1;

            nums.forEach((num)=>{
                if(num !== -1){
                    sum += num;
                    cnt++;
                }
            })
            if(cnt > 0) ret = sum / cnt;
            return ret;
        }
        if(sheet){
            const objAvg: Avg = {
                sheetAvg: -1,
                sections: 
                    sheet.section && sheet.section.items ?
                    sheet.section.items.map(section=>{
                        return {
                            sectionId: section?.id,
                            avg: section && section.objective && section.objective.items ?
                            getAvg(section.objective.items.map(objective=>{
                                return objective && objective.progress ? objective.progress : -1
                            })) :
                            -1
                        }
                    }) :
                    null
            }
            const sheetAvg = {
                ...objAvg,
                sheetAvg: 
                    objAvg.sections ?
                    getAvg(objAvg.sections.map(section=>{
                        return section.avg
                    })) : 
                    -1
            }
            setSheetAvg(sheetAvg)
            console.log("平均", sheetAvg)
        }
    }, [sheet]);

    if (sheet === undefined) return <p>Loading</p>
    else if (sheet === null) {
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
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
            {/* サイドバーのコンポーネントを配置する */}

            <div>
                {/* 目標変更モーダル */}
                <Formik
                    initialValues={{
                        content: modalObjective?.content,
                        expStartDate: modalObjective?.expDoneDate,
                        expDoneDate: modalObjective?.expDoneDate,
                        selfEvaluation: String(modalObjective?.selfEvaluation),
                        priority: modalObjective?.priority,
                        result: modalObjective?.result
                    }}
                    onSubmit={async (values, actions) => {
                        console.log("values", values);

                        // 承認ステータス3の場合,実績と自己評価以外の項目を変更した場合の処理
                        if (sheet.statusValue === 3) {
                            const comparisonValues = [values.content, values.expStartDate, values.expDoneDate, values.priority, values.selfEvaluation];
                            const comparisonObjectives = [modalObjective?.content, modalObjective?.expStartDate, modalObjective?.expDoneDate, modalObjective?.priority, (modalObjective?.selfEvaluation)?.toString()];
                            handleCheckObjectiveItems(comparisonValues, comparisonObjectives);
                        } 

                        //項目明細 情報更新
                        const objectiveId = changeObjectiveId;
                        let selfEvaluationInput:number | null | undefined = parseInt(values.selfEvaluation);
                        if(isNaN(selfEvaluationInput)) {
                            selfEvaluationInput = undefined;
                        }
                        //目標変更の目標、ステータス、自己評価、優先順位、実績を項目明細に上書き
                        const updateI: APIt.UpdateObjectiveInput = {
                            id: objectiveId,
                            content: values.content,
                            selfEvaluation: selfEvaluationInput,
                            priority: values.priority,
                            result: values.result,
                            expStartDate: values.expStartDate,
                            expDoneDate: values.expDoneDate
                        };
                        //console.log('updateI',updateI); //検証用
                        const updateMV: APIt.UpdateObjectiveMutationVariables = {
                            input: updateI,
                        };
                        console.log('updateMV',updateMV); //検証用
                        let updateR: GraphQLResult<APIt.UpdateObjectiveMutation>
                        try{
                            updateR = await API.graphql(graphqlOperation(updateObjective, updateMV)) as GraphQLResult<APIt.UpdateObjectiveMutation>;
                        }catch(e){
                            console.log("エラーを無視しています", e)
                            console.log("データが不完全でないことを確認してください")
                            updateR = e;
                        }

                        if (updateR.data) {
                            const updateTM: APIt.UpdateObjectiveMutation = updateR.data;
                            if (updateTM.updateObjective) {
                                const objective: Objective = updateTM.updateObjective;
                                console.log('UpdateObjective:', objective);
                            }
                        }

                        window.location.reload()
                        handleCloseObjectiveUpdate();
 
                    }}
                >
                    {props => (
                        <Modal show={objectiveUpdateShow} onHide={handleCloseObjectiveUpdate} size="xl">
                            <form onSubmit={props.handleSubmit}>
                                <Modal.Header closeButton>
                                    <Modal.Title>目標変更</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <Row>
                                        <Col>目標</Col>
                                        <Col>
                                            <Form.Control
                                                as="textarea"
                                                name="content"
                                                onChange={props.handleChange}
                                                defaultValue={modalObjective?.content}
                                                className={inputFieldStyle}
                                                rows={5}
                                            />
                                            <p></p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="2" lg="2" xl="2">開始予定日</Col>
                                        <Col md="4" lg="4" xl="4">
                                            <Form.Control
                                                required
                                                type="date"
                                                name="expStartDate"
                                                onChange={props.handleChange}
                                                defaultValue={modalObjective?.expStartDate || undefined}
                                                className={inputFieldStyle}
                                            />
                                            <p></p>
                                        </Col>
                                        <Col md="2" lg="2" xl="2">完了予定日</Col>
                                        <Col md="4" lg="4" xl="4">
                                            <Form.Control
                                                required
                                                type="date"
                                                name="expDoneDate"
                                                onChange={props.handleChange}
                                                defaultValue={modalObjective?.expDoneDate || undefined}
                                                className={inputFieldStyle}
                                            />
                                            <p></p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>自己評価</Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="selfEvaluation"
                                                onChange={props.handleChange}
                                                defaultValue={String(modalObjective?.selfEvaluation) || undefined}
                                                className={inputFieldStyle} >
                                                <option></option>
                                                <option value='1'>1</option>
                                                <option value='2'>2</option>
                                                <option value='3'>3</option>
                                                <option value='4'>4</option>
                                                <option value='5'>5</option>
                                            </Form.Control>
                                            <p></p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>優先順位</Col>
                                        <Col>
                                            <Form.Control
                                                as="select"
                                                name="priority"
                                                onChange={props.handleChange}
                                                defaultValue={modalObjective?.priority || undefined}
                                                className={inputFieldStyle} >
                                                <option></option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                            </Form.Control>
                                            <p></p>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>実績</Col>
                                        <Col>
                                            <Form.Control
                                                as="textarea"
                                                name="result"
                                                onChange={props.handleChange}
                                                defaultValue={modalObjective?.result || undefined}
                                                className={inputFieldStyle}
                                                rows={5}
                                            />
                                        </Col>
                                    </Row>
                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleCloseObjectiveUpdate}>
                                        キャンセル
                            </Button>
                                    <Button variant="primary" type="submit">
                                        変更保存
                            </Button>
                                </Modal.Footer>
                            </form>
                        </Modal>

                    )}
                </Formik>

                <Modal show={careerPlanUpdateShow} onHide={handleCloseCareerPlanUpdate}>
                    <Modal.Header closeButton>
                        <Modal.Title>キャリアプラン</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Row>
                            <Col>キャリアプラン本人希望内容</Col>
                            <Col><textarea rows={10} cols={60} name="careerPlan" onChange={handleChangeCareerPlan} className={inputFieldStyle}>{sheet.careerPlan || ""}</textarea></Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseCareerPlanUpdate}>
                            キャンセル
                    </Button>
                        <Button variant="primary" onClick={HandleUpdateCareerPlan}>
                            保存
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
            {/* ヘッダーの表示 */}
            <HeaderComponents />
            <div>
                <RevieweeSidebar />
                <Container>
                    <ApprovalStatusBox statusValue={sheet.statusValue || -1}/>
                    <h2>メイン</h2>
                    <h3>目標一覧</h3>
                    {(() => {
                        if (sheet.statusValue === 1 || sheet.statusValue === 3) {
                            return (
                                <Link to={`/reviewee/objective/new/${sheetId}`}>
                                    <Button variant="info">
                                        目標追加
                                    </Button>
                                </Link>
                            );
                        }
                    })()}
                    <div>
                    <ArcGauge
                        {...{
                            value: sheetAvg ? sheetAvg.sheetAvg : 0,
                            colors: arcColors
                        }} style={{
                            width: '150px',
                            height: '150px',
                            display: 'inline-block'
                        }} 
                    />
                    </div>

                    {sectionItems.map((section: Section) => {

                        //作成日を元に項目明細をソート
                        const objectiveItems = section.objective?.items as Objective[];
                        objectiveItems?.sort(function (a, b) {
                            if (a.createdAt > b.createdAt) {
                                return 1;
                            } else {
                                return -1;
                            }
                        });

                        
                        return (
                            <div key={section.id}>
                                <h4>
                                    {section.category?.name}
                                    {(() => {
                                        if(sheetAvg && sheetAvg.sections){
                                            const value = sheetAvg.sections.find(sectionAvg => {
                                                return section.id === sectionAvg.sectionId
                                            })?.avg
                                            if(value){
                                                return <ArcGauge
                                                    {...{
                                                        value: value,
                                                        colors: arcColors
                                                    }} style={{
                                                        width: '50px',
                                                        height: '50px',
                                                        display: 'inline-block'
                                                    }} 
                                                />
                                            }
                                        }
                                    })()} 

                                </h4>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>#</td>
                                            <td>目標</td>
                                            <td>実績</td>
                                            <td>進捗率</td>
                                            <td>優先順位</td>
                                            <td>開始予定日</td>
                                            <td>完了予定日</td>
                                            <td>自己評価</td>
                                            <td>最終評価</td>
                                            <td>更新日時</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {objectiveItems.map((objective: Objective) => {
                                            const date = new Date(objective.updatedAt);
                                            var expDoneDateStyle: string; //完了予定日のクラス名
                                            var currentDate = new Date().getTime();
                                            var doneDate = new Date(objective.expDoneDate!).getTime();

                                            //完了予定日のスタイルの分岐
                                            if(doneDate < currentDate && doneDate !== 0) {
                                                expDoneDateStyle = Style.indexExpDoneDateExpired;
                                            } else if(doneDate >= currentDate) {
                                                expDoneDateStyle = Style.indexExpDoneDateInProgress;
                                            } else {
                                                expDoneDateStyle = "";
                                            }

                                            return (
                                                <tr key={objective.id}>
                                                    <td>
                                                        {(() => {
                                                            if (sheet.statusValue === 1 || sheet.statusValue === 3) {
                                                                return (
                                                                    <Button variant="primary" data-objectiveId={objective.id} onClick={HandleChange}>変更</Button>
                                                                );
                                                            } else if (sheet.statusValue === 2 || sheet.statusValue === 10 || sheet.statusValue === 11 || sheet.statusValue === 12 || sheet.statusValue === 13) {
                                                                return (
                                                                    <Button variant="primary" disabled>変更</Button>
                                                                );
                                                            }
                                                        })()} 
                                                    </td>
                                                    <td>{objective.content}</td>
                                                    <td>{objective.result}</td>
                                                    {(() => {
                                                        // 承認ステータスが1,3の場合,数値入力フィールドを表示
                                                        if (sheet.statusValue === 1 || sheet.statusValue === 3) {
                                                            // 進捗率が空の場合,下記を表示
                                                            if (objective.progress === null || objective.progress === undefined) {
                                                                return (
                                                                    <td>
                                                                        <input name="progress" onChange={handleChangeProgress} data-objective-id={objective.id} type="number" min="0" max="100" step="10" className={inputFieldStyle}></input>
                                                                        <p>%</p>
                                                                    </td>
                                                                )
                                                            }
                                                            // 進捗率が入力済みの場合,下記を表示 
                                                            else {
                                                                // progress 型変換
                                                                const valueProgress = String(objective.progress);
                                                                return (
                                                                    <td>
                                                                        <input name="progress" onChange={handleChangeProgress} data-objective-id={objective.id} placeholder={valueProgress} type="number" min="0" max="100" step="10" className={inputFieldStyle}></input>
                                                                        <p>%</p>
                                                                    </td>
                                                                );
                                                            }
                                                        } else {
                                                            // 承認ステータスが1以外の場合,読み込み専用コンポーネントを表示
                                                            return <td>{objective.progress || "-"}%</td>
                                                        }
                                                    })()}
                                                    <td>{objective.priority}</td>
                                                    <td>{objective.expStartDate?.replace(/-/g,'/')}</td>
                                                    <td className={expDoneDateStyle}>{objective.expDoneDate?.replace(/-/g,'/')}</td>
                                                    <td>{objective.selfEvaluation}</td>
                                                    <td>{objective.lastEvaluation}</td>
                                                    <td>{dateFormat(date, "yyyy/mm/dd HH:MM")}</td>
                                                    {(() => {
                                                        if (sheet.statusValue === 1) {
                                                            return (
                                                                <td>
                                                                    <Button variant="danger" onClick={handleDeleteObjective} data-objective-id={objective.id}>削除</Button>
                                                                </td>
                                                            );
                                                        }
                                                    })()}
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </Table>
                            </div>
                        )
                    })}

                    <h4>キャリア計画</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>本人希望
                                {(() => {
                                        //ステータス1,2,3の場合,編集ボタンを表示
                                        if (sheet.statusValue === 1 || sheet.statusValue === 2 || sheet.statusValue === 3) {
                                            return (
                                                <Button variant="info" onClick={handleShowCareerPlanUpdate}>編集</Button>
                                            );
                                        }
                                    })()}
                                </td>
                                <td>話し合い結果</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{sheet.careerPlan}</td>
                                <td>{sheet.careerPlanComment}</td>
                            </tr>
                        </tbody>
                    </Table>

                    <h4>年度評価</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>■所属長コメント</td>
                                <td>日付</td>
                                <td>■部門長コメント</td>
                                <td>日付</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{sheet.secondComment || "なし"}</td>
                                <td>{sheet.secondCheckDate?.replace(/-/g,'/') || "-"}</td>
                                <td>{sheet.firstComment || "なし"}</td>
                                <td>{sheet.firstCheckDate?.replace(/-/g,'/') || "-"}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h4>総合評価</h4>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <td>前々期</td>
                                <td>前期</td>
                                <td>今期</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{previousPeriod[1]}</td>
                                <td>{previousPeriod[0]}</td>
                                <td>{sheet.overAllEvaluation || "未評価"}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <Card>
                        <Card.Header><h4>評価基準</h4></Card.Header>
                        <Card.Body>
                            <p>5:非常に良い成果をあげた</p>
                            <p>4:良い成果をあげた</p>
                            <p>3:成果は普通の水準であった</p>
                            <p>2:成果はやや物足りなかった</p>
                            <p>1:成果は不十分であった</p>
                        </Card.Body>
                    </Card>
                    {sheet.statusValue === 1 ? 
                        <Button
                            onClick={()=>{
                                const work = commandWorkFlow(Command.REVIEWEE_SUBMIT, sheet)
                                afterWorkFlow(sheet, work)
                            }}
                        >
                            所属長提出
                        </Button> 
                    : null}
                    {sheet.statusValue === 3 ? 
                        <Button
                            onClick={()=>{
                                const work = commandWorkFlow(Command.REVIEWEE_INPUT_RESULT, sheet)
                                afterWorkFlow(sheet, work)
                            }}
                        >
                            所属長提出
                        </Button> 
                    : null}
                    {sheet.statusValue === 11 ? 
                        <Button
                            onClick={()=>{
                                const work = commandWorkFlow(Command.REVIEWEE_CONFIRM_SCORE, sheet)
                                afterWorkFlow(sheet, work)
                            }}
                        >
                            内容確認
                        </Button> 
                    : null}
                </Container>
            </div>
        </div>
    );
}

export default RevieweeSheetShow;