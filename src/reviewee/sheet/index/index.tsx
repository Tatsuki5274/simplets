import React, { useState, useEffect, createContext, useContext } from "react";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { getSheet } from "graphql/queries";
import { ErrorContext, HeaderContext, SidebarContext } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import { SheetDao } from "lib/dao/sheetDao";
import { RevieweeSheetObjectiveReadonly } from "./components/objective/readonly";
import { RevieweeSheetCareerEditable } from "./components/career/editable";
import { RevieweeSheetCareerReadonly } from "./components/career/readonly";
import { SubmitButtonStatus1 } from "./components/submit/status1";
import { SubmitButtonStatus3 } from "./components/submit/status3";
import { SubmitButtonStatus11 } from "./components/submit/status11";
import { OverEvaluationTable } from "./components/overEvaluation";
import { BorderTable } from "./components/border";
import { YearlyTable } from "./components/yearly";
import { AverageSmallGaugeBox } from "./components/averageGauge/small";
import { AverageMediumGaugeBox } from "./components/averageGauge/medium";
import { Link } from "react-router-dom";
import { RevieweeSheetObjectiveModalStatus1 } from "./components/objectiveModal/status1";
import { RevieweeSheetObjectiveModalStatus3 } from "./components/objectiveModal/status3";
import { ObjectiveCreateModal } from "./components/objectiveCreateModal";
import { tableHeaderStyle } from "common/globalStyle.module.scss";
import { SubmitButtonStatus2 } from "./components/submit/status2";
import { RevieweeSheetObjectiveEditableStatus1 } from "./components/objective/editable/status1";
import { RevieweeSheetObjectiveEditableStatus3 } from "./components/objective/editable/status3";
import { YearlyTableStatus10 } from "./components/yearly/status10";
import { OverEvaluationTableStatus10 } from "./components/overEvaluation/status10";
import { RevieweeSheetObjectiveReadonlyStatus10 } from "./components/objective/readonly/status10";
import { GetSheetQueryVariables, Objective, Section, Sheet } from "API";
import Container from "views/components/common/templates/Container";
import Header from "views/components/common/organisms/Header";
import { routeBuilder } from "router";
import ScrollTable from "views/components/common/molecules/ScrollTable";
import Title from "views/components/common/molecules/Title";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import InterviewTable from "views/components/evaluation/reviewee/organisms/InterviewTable";
import LoadingScreen from "views/components/common/templates/LoadingScreen";

export const SheetContext = createContext<{
  sheet: Sheet | null;
  setSheet:
    | React.Dispatch<React.SetStateAction<Sheet | undefined>>
    | null
    | undefined;
}>({ sheet: null, setSheet: null });

type Props = {
  match: {
    params: {
      sheetId: string;
    };
  };
};

function RevieweeSheetShow(props: Props): JSX.Element {
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

  const header = useContext(HeaderContext);
  const sidebar = useContext(SidebarContext);
  const setError = useContext(ErrorContext);

  //表示用データ
  useEffect(() => {
    (async () => {
      if (props.match.params.sheetId) {
        const getI: GetSheetQueryVariables = {
          id: props.match.params.sheetId,
        };
        const sheet = await SheetDao.get(getSheet, getI);
        if (sheet) {
          setSheet(sheet);
        } else {
          setError("シート情報の取得に失敗しました");
        }
      }
    })();
  }, [props.match.params.sheetId, setError]);

  if (sheet === undefined) return <LoadingScreen />;
  else if (sheet === null) {
    return <p>該当のシートは存在しません</p>;
  }

  //カテゴリ情報のnoを元に昇順でソート
  const sectionItems = sheet.section?.items as Section[];
  sectionItems?.sort(function (a, b) {
    if (a && b && a.no && b.no && a.no > b.no) {
      return 1;
    } else {
      return -1;
    }
  });

  return (
    <SheetContext.Provider value={{ sheet: sheet, setSheet: setSheet }}>
      {/* 共通 */}
      <Header {...header} />
      {/* <RevieweeSidebar /> */}

      <Container>
        <div>
          {modalObjective && sheet.statusValue === 1 ? (
            <RevieweeSheetObjectiveModalStatus1
              objective={modalObjective}
              isShowModal={objectiveUpdateShow}
              handleClose={handleCloseObjectiveUpdate}
            />
          ) : modalObjective && sheet.statusValue === 3 ? (
            <RevieweeSheetObjectiveModalStatus3
              objective={modalObjective}
              isShowModal={objectiveUpdateShow}
              handleClose={handleCloseObjectiveUpdate}
            />
          ) : null}
        </div>
        {/* <LeftBox><RevieweeSidebar /></LeftBox> */}
        <LeftBox>
          <Sidebar data={sidebar} />
        </LeftBox>
        <RightBox>
          <Content>
            <>
              <Link to={routeBuilder.revieweeListPath()}>
                <Button>戻る</Button>
              </Link>
              <ApprovalStatusBox statusValue={sheet.statusValue || -1} />
              <Title>業績評価</Title>
              {sheet.statusValue === 1 ? (
                <ObjectiveCreateModal
                  year={sheet.year || 0} // unsafe
                  id={sheet.id || ""} // unsafe
                />
              ) : null}

              <AverageMediumGaugeBox sheet={sheet} />

              {sectionItems.map((section: Section) => {
                //作成日を元に項目明細をソート
                const objectiveItems = section.objective?.items as Objective[];
                objectiveItems?.sort(function (a, b) {
                  if (a.createdAt && b.createdAt && a.createdAt > b.createdAt) {
                    return 1;
                  } else {
                    return -1;
                  }
                });

                return (
                  <div key={section.id}>
                    <AverageSmallGaugeBox section={section} />
                    <ScrollTable>
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
                          return sheet.statusValue === 1 ? (
                            <RevieweeSheetObjectiveEditableStatus1
                              handleOpenModal={handleShowObjectiveUpdate}
                              objective={objective}
                              setModalObjective={setModalObjective}
                            />
                          ) : sheet.statusValue === 3 ? (
                            <RevieweeSheetObjectiveEditableStatus3
                              handleOpenModal={handleShowObjectiveUpdate}
                              objective={objective}
                              setModalObjective={setModalObjective}
                            />
                          ) : sheet.statusValue === 10 ? (
                            <RevieweeSheetObjectiveReadonlyStatus10
                              objective={objective}
                            />
                          ) : (
                            <RevieweeSheetObjectiveReadonly
                              objective={objective}
                            />
                          );
                        })}
                      </tbody>
                    </ScrollTable>
                  </div>
                );
              })}

              <h4>キャリア計画</h4>
              {sheet.statusValue === 1 ||
              sheet.statusValue === 2 ||
              sheet.statusValue === 3 ? (
                <RevieweeSheetCareerEditable />
              ) : (
                <RevieweeSheetCareerReadonly />
              )}

              <h4>インタビュー実施記録</h4>
              <InterviewTable
                interviewPlanDate={sheet.interviewPlanDate || null}
                interviewPlanComment={sheet.interviewPlanComment || null}
                InterviewMid1Date={sheet.InterviewMid1Date || null}
                InterviewMid1Comment={sheet.InterviewMid1Comment || null}
                InterviewMid2Date={sheet.InterviewMid2Date || null}
                InterviewMid2Comment={sheet.InterviewMid2Comment || null}
                InterviewMid3Date={sheet.InterviewMid3Date || null}
                InterviewMid3Comment={sheet.InterviewMid3Comment || null}
              />

              <h4>年度評価</h4>
              {sheet.statusValue === 10 ? (
                <YearlyTableStatus10 />
              ) : (
                <YearlyTable
                  secondComment={sheet.secondComment || null}
                  secondCheckDate={sheet.secondCheckDate || null}
                  firstComment={sheet.firstComment || null}
                  firstCheckDate={sheet.firstCheckDate || null}
                />
              )}

              <h4>総合評価</h4>
              {sheet.statusValue === 10 ? (
                <OverEvaluationTableStatus10 />
              ) : (
                <OverEvaluationTable />
              )}

              <BorderTable />

              {sheet.statusValue === 1 ? <SubmitButtonStatus1 /> : null}

              {sheet.statusValue === 2 ? <SubmitButtonStatus2 /> : null}

              {sheet.statusValue === 3 ? <SubmitButtonStatus3 /> : null}

              {sheet.statusValue === 11 ? <SubmitButtonStatus11 /> : null}
            </>
          </Content>
        </RightBox>
      </Container>
    </SheetContext.Provider>
  );
}

export default RevieweeSheetShow;
