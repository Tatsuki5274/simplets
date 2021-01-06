import React, { useState, useEffect, createContext } from 'react';
import { Button, Col, Row, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getSheet } from 'graphql/queries'
import { Sheet, Section, Objective } from 'App';
import HeaderComponents from 'common/header';//ヘッダーの表示
import ApprovalStatusBox from 'common/approvalStatusBox';
import { RevieweeSidebar, sidebarBackgroundColor } from 'common/Sidebar';
import { SheetDao } from 'lib/dao/sheetDao';
import { RevieweeSheetObjectiveReadonly } from './components/objective/readonly';
import { RevieweeSheetObjectiveEditable } from './components/objective/editable';
import { RevieweeSheetCareerEditable } from './components/career/editable';
import { RevieweeSheetCareerReadonly } from './components/career/readonly';
import { SubmitButtonStatus1 } from './components/submit/status1';
import { SubmitButtonStatus3 } from './components/submit/status3';
import { SubmitButtonStatus11 } from './components/submit/status11';
import { OverEvaluationTable } from './components/overEvaluation';
import { BorderTable } from './components/border';
import { YearlyTable } from './components/yearly';
import { AverageSmallGaugeBox } from './components/averageGauge/small';
import { AverageMediumGaugeBox } from './components/averageGauge/medium';
import { Link } from 'react-router-dom';
import { RevieweeSheetObjectiveModalStatus1 } from './components/objectiveModal/status1';
import { RevieweeSheetObjectiveModalStatus3 } from './components/objectiveModal/status3';
import { ObjectiveCreateModal } from './components/objectiveCreateModal';
import { tableHeaderStyle } from 'common/globalStyle.module.scss';
import style from './indexStyle.module.scss';
import { getSectionKeys } from 'lib/util';


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
            companyId: string
            reviewee: string
            year: string
        }
    }
}

function RevieweeSheetShow(props: Props) {
    
    // const sheetId = props.match.params.sheetId;

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
            const sheet = await SheetDao.get(getSheet, {companyID:props.match.params.companyId, reviewee:props.match.params.reviewee, year:parseInt(props.match.params.year)})
            if(sheet){
                setSheet(sheet);
            }
        })()
    }, []);

    if (sheet === undefined) return <p>Loading</p>
    else if (sheet === null) {
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
    }

    //カテゴリ情報のnoを元に昇順でソート
    const sectionItems = sheet.section?.items as Section[];
    sectionItems?.sort(function (a, b) {
        if (a?.category && b?.category && a.category.localID > b.category.localID) {
            return 1;
        } else {
            return -1;
        }
    });

    return (
        <SheetContext.Provider value={{sheet: sheet, setSheet: setSheet}}>
            {/* 共通 */}
            <HeaderComponents />
            {/* <RevieweeSidebar /> */}


            <div>
                {modalObjective && sheet.statusValue === 1 ?
                <RevieweeSheetObjectiveModalStatus1 objective={modalObjective} isShowModal={objectiveUpdateShow} handleClose={handleCloseObjectiveUpdate} /> :
                    modalObjective && sheet.statusValue === 3 ?
                <RevieweeSheetObjectiveModalStatus3 objective={modalObjective} isShowModal={objectiveUpdateShow} handleClose={handleCloseObjectiveUpdate} /> :
                null}
            </div>
            <Row >
                <Col
                    xs={1}
                    sm={1}
                    md={1}
                    lg={1}
                    xl={1}
                    style={sidebarBackgroundColor}
                >
                    <RevieweeSidebar />
                </Col>
                <Col
                    xs={10}
                    sm={10}
                    md={10}
                    lg={10}
                    xl={10}
                >
                    <Link to={`/reviewee/list`} >
                        <Button >戻る</Button>
                    </Link>
                    <ApprovalStatusBox statusValue={sheet.statusValue || -1}/>
                    <h2>業績評価</h2>
                    {sheet.statusValue === 1 || sheet.statusValue === 3 ?
                    <ObjectiveCreateModal
                        sheetId={sheet.sheetGroupLocalId}
                    /> : null}
                    
                    <AverageMediumGaugeBox sheet={sheet} />

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
                            <div key={getSectionKeys(section)}>
                                <AverageSmallGaugeBox section={section} />
                                <Table bordered hover className={style.objectiveTableView}>
                                    <thead className={tableHeaderStyle}>
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
                </Col>
            </Row>
        </SheetContext.Provider>
    );
}

export default RevieweeSheetShow;