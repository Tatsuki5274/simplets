import { Sheet } from "API";
import { textareaDisplayStyle } from "common/globalStyle.module.scss";
import React from "react";

type Props = {
  sheet: Sheet;
};
export const ReviewerSheetDetailCareerReadonly = (
  props: Props
): JSX.Element => {
  return (
    <div>
      <h4>本人希望</h4>
      {/* 本人希望 情報表示 */}
      <p className={textareaDisplayStyle}>{props.sheet.careerPlan}</p>

      <h4>話し合い結果</h4>
      <p className={textareaDisplayStyle}>{props.sheet.careerPlanComment}</p>
    </div>
  );
};
