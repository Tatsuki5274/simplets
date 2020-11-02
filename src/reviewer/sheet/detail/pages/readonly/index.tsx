import { Section, Sheet } from "App";
import ApprovalStatusBox from "common/approvalStatusBox";
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ReviewerSheetDetailCareerReadonly } from "../../components/career/readonly";
import { ReviewerSheetDetailInterviewReadonly } from "../../components/interview/readonly";
import { ReviewerSheetDetailYearlyReadonly } from "../../components/yearly/readonly";
import { ReviewerSheetDetailObjectiveReadonly } from "../../components/objective/readonly";

type Props = {
    sheet: Sheet,
    sections: Section[]
}

export const ReviewerSheetPagesReadonly = (props: Props)=>{
    return (
        <div>
            {/* 評価画面 */}
            <div>
                <Container>
                    <Link to={`/reviewer/list`} >
                        <Button >戻る</Button>
                    </Link>
                    <ApprovalStatusBox statusValue={props.sheet.statusValue || -1}/>
                    <h3>今後のキャリア計画</h3><br />

                    <ReviewerSheetDetailCareerReadonly sheet={props.sheet}/>


                    {/* インタビュー実施記録 */}
                    <h4>インタビュー実施記録</h4>
                    <ReviewerSheetDetailInterviewReadonly sheet={props.sheet} />

                    {/* 年度評価 */}
                    <h4>年度評価</h4>
                    <ReviewerSheetDetailYearlyReadonly sheet={props.sheet} />

                    {/* 目標コンポーネント */}
                    <ReviewerSheetDetailObjectiveReadonly sections={props.sections} />
                </Container>
            </div>

        </div>
    );
}