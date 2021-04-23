import React from "react";
import Text from "views/components/atoms/Text";
import styled from "styled-components";

type Props = {
    revieweeMailAddress: string | null
    // date: Date
    sub: string
    date: string
    commentWork: string
    workStatus: string
    commentStatus: string
    commentOther: string
    commentReviewer: string
    reviewee: string
    revieweeName: string
}

export default function (props: Props) {
    return (
        <>
            <div>
                <Text>作業報告 {props.date.replace(/-/g, '/')}</Text>
            </div>

            <ReportStyle>
                <Text>{`作業報告者 ${props.revieweeName}`}</Text>
            </ReportStyle>

            <div>
                <Text className="commentWork">【作業報告】</Text>
            </div>
            <ReportStyle>
                <Text className="commentWork">
                    {props.commentWork}
                </Text>
            </ReportStyle>

            <div>
                <Text className="workStatus">【作業状況】</Text>
            </div>
            <ReportStyle>
                <Text className="workStatus">
                    {props.workStatus}
                </Text>
            </ReportStyle>

            <div>
                <Text className="commentStatus">【作業状況】</Text>
            </div>
            <ReportStyle>
                <Text className="commentStatus">
                    {props.commentStatus}
                </Text>
            </ReportStyle>

            <div>
                <Text className="commentOther">【その他】</Text>
            </div>
            <ReportStyle>
                <Text className="commentOther">
                    {props.commentOther}
                </Text>
            </ReportStyle>

            <div>
                <Text className="commentReviewer">【所属長コメント】</Text>
            </div>
            <ReportStyle>
                <Text>
                    {props.commentReviewer}
                </Text>
            </ReportStyle>
        </>
    )
}

const ReportStyle = styled.div({
    marginBottom: "20px",
    whiteSpace: "pre-line",
})