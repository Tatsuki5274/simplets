import React, { useState, useEffect, createContext } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSheet } from 'graphql/queries'
import { Sheet, Section, Objective } from 'App';
import HeaderComponents from 'common/header';//ヘッダーの表示
import ApprovalStatusBox from 'common/approvalStatusBox';
import { RevieweeSidebar } from 'common/Sidebar';
import { SheetDao } from 'lib/dao/sheetDao';
import { RevieweeSheetObjectiveReadonly } from './components/objective/readonly';
import { RevieweeSheetObjectiveEditable } from './components/objective/editable';
import { RevieweeSheetCareerEditable } from './components/career/editable';
import { RevieweeSheetCareerReadonly } from './components/career/readonly';
import { SubmitButtonStatus1 } from './components/submit/status1';
import { SubmitButtonStatus3 } from './components/submit/status3';
import { SubmitButtonStatus11 } from './components/submit/status11';
import { AddObjectiveButton } from './components/buttons/AddObjective';
import { OverEvaluationTable } from './components/overEvaluation';
import { BorderTable } from './components/border';
import { YearlyTable } from './components/yearly';
import { AverageSmallGaugeBox } from './components/averageGauge/small';
import { AverageMediumGaugeBox } from './components/averageGauge/medium';
import { Link } from 'react-router-dom';
import { RevieweeSheetObjectiveModalStatus1 } from './components/objectiveModal/status1';
import { RevieweeSheetObjectiveModalStatus3 } from './components/objectiveModal/status3';

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

function RevieweeSheetShow(props: Props) {
    
    const sheetId = props.match.params.sheetId;

    const [sheet, setSheet] = useState<Sheet>();

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
                    {modalObjective && sheet.statusValue === 1 ?
                    <RevieweeSheetObjectiveModalStatus1 objective={modalObjective} isShowModal={objectiveUpdateShow} handleClose={handleCloseObjectiveUpdate} /> :
                     modalObjective && sheet.statusValue === 3 ?
                    <RevieweeSheetObjectiveModalStatus3 objective={modalObjective} isShowModal={objectiveUpdateShow} handleClose={handleCloseObjectiveUpdate} /> :
                    null}
                </div>
                <div>
                    <RevieweeSidebar />
                    <Container>
                        <Link to={`/reviewee/list`} >
                            <Button >戻る</Button>
                        </Link>
                        <ApprovalStatusBox statusValue={sheet.statusValue || -1}/>
                        <h2>業績評価</h2>
                        {sheet.statusValue === 1 || sheet.statusValue === 3 ?
                        <AddObjectiveButton sheetId={sheetId} /> : null}
                        
                        <AverageMediumGaugeBox sheet={sheet} />

                        {sectionItems.map((section: Section) => {

                            //作成日を元に項目明細をソート
                            const objectiveItems = section.objective?.items as Objective[];

                            
                            return (
                                <div key={section.id}>
                                    <AverageSmallGaugeBox section={section} />
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