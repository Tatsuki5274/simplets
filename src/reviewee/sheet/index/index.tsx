import React, { useState, useEffect, useContext, createContext } from 'react';
import { Container, Table, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSheet, listSheets } from 'graphql/queries'
import { Sheet, Section, Objective, UserContext } from 'App';
import * as APIt from 'API';
import HeaderComponents from 'common/header';//ヘッダーの表示
import Style from './indexStyle.module.scss';
import ApprovalStatusBox from 'common/approvalStatusBox';
import { RevieweeSidebar } from 'common/Sidebar';
import { SheetDao } from 'lib/dao/sheetDao';
import { RevieweeSheetObjectiveModal } from './components/objectiveModal';
import { RevieweeSheetObjectiveReadonly } from './components/objective/readonly';
import { RevieweeSheetObjectiveEditable } from './components/objective/editable';
import { RevieweeSheetCareerEditable } from './components/career/editable';
import { RevieweeSheetCareerReadonly } from './components/career/readonly';
import { SmallGage } from './components/gage/small';
import { MediumGage } from './components/gage/medium';
import { SubmitButtonStatus1 } from './components/submit/status1';
import { SubmitButtonStatus3 } from './components/submit/status3';
import { SubmitButtonStatus11 } from './components/submit/status11';
import { AddObjectiveButton } from './components/buttons/AddObjective';
import { OverEvaluationTable } from './components/overEvaluation';
import { BorderTable } from './components/border';
import { YearlyTable } from './components/yearly';

export const SheetContext = createContext<
    {
        sheet: Sheet | null,
        setSheet: 
            (React.Dispatch<React.SetStateAction<Sheet | undefined>>)
            | null | undefined 
    }
>({sheet: null, setSheet: null})

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

    const [sheet, setSheet] = useState<Sheet>();
    const [sheetAvg, setSheetAvg] = useState<Avg>()

    const [modalObjective, setModalObjective] = useState<Objective>();

    //モーダル
    const [objectiveUpdateShow, setObjectiveUpdateShow] = useState(false);
    const handleCloseObjectiveUpdate = () => setObjectiveUpdateShow(false);
    const handleShowObjectiveUpdate = () => setObjectiveUpdateShow(true);

    // const [careerPlanUpdateShow, setCareerPlanUpdateShow] = useState(false);
    // const handleCloseCareerPlanUpdate = () => setCareerPlanUpdateShow(false);
    // const handleShowCareerPlanUpdate = () => setCareerPlanUpdateShow(true);


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
        <SheetContext.Provider value={{sheet: sheet, setSheet: setSheet}}>

            <div>
                {/* 共通 */}
                <HeaderComponents />

                <div>
                    {modalObjective ?
                    <RevieweeSheetObjectiveModal objective={modalObjective} isShowModal={objectiveUpdateShow} handleClose={handleCloseObjectiveUpdate} /> :
                    null}
                </div>
                <div>
                    <RevieweeSidebar />
                    <Container>
                        <ApprovalStatusBox statusValue={sheet.statusValue || -1}/>
                        <h2>業績評価</h2>
                        {sheet.statusValue === 1 || sheet.statusValue === 3 ?
                        <AddObjectiveButton sheetId={sheetId} /> : null}
                        
                        <div>
                            <MediumGage value={sheetAvg ? sheetAvg.sheetAvg : 0} id={sheet.id} />
                        </div>

                        {sectionItems.map((section: Section) => {

                            //作成日を元に項目明細をソート
                            const objectiveItems = section.objective?.items as Objective[];

                            
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
                                                    if (section.category?.id) {
                                                        return <SmallGage value={value} id={section.category.id} />
                                                    }
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
                                                <td>進捗率(%)</td>
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
                                                return (
                                                    sheet.statusValue === 1 || sheet.statusValue === 3 ?
                                                    <RevieweeSheetObjectiveEditable
                                                        handleOpenModal={handleShowObjectiveUpdate}
                                                        objective={objective}
                                                        setModalObjective={setModalObjective}
                                                    /> :
                                                    <RevieweeSheetObjectiveReadonly objective={objective} />
                                                )

                                              
                                            })}
                                        </tbody>
                                    </Table>
                                </div>
                            )
                        })}

                        <h4>キャリア計画</h4>
                        {sheet.statusValue === 1 || sheet.statusValue === 2 || sheet.statusValue === 3 ?
                        <RevieweeSheetCareerEditable /> :
                        <RevieweeSheetCareerReadonly />}

                        <h4>年度評価</h4>
                        <YearlyTable
                            secondComment={sheet.secondComment}
                            secondCheckDate={sheet.secondCheckDate}
                            firstComment={sheet.firstComment}
                            firstCheckDate={sheet.firstCheckDate}
                        />

                        <h4>総合評価</h4>
                        <OverEvaluationTable />

                        <BorderTable />
                        
                        {sheet.statusValue === 1 ? 
                        <SubmitButtonStatus1 /> : null}

                        {sheet.statusValue === 3 ?
                        <SubmitButtonStatus3 /> : null}

                        {sheet.statusValue === 11 ?
                        <SubmitButtonStatus11 /> : null}
                    </Container>
                </div>
            </div>
        </SheetContext.Provider>
    );
}

export default RevieweeSheetShow;