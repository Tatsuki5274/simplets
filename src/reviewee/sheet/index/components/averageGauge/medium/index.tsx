import { Sheet } from "API";
import { calcAvg, createGaugeId, round } from "lib/util";
import React from "react";
import { MediumGage } from "../../gage/medium";

type Props = {
  sheet: Sheet;
};

export const AverageMediumGaugeBox = (props: Props): JSX.Element | null => {
  // カテゴリ別の平均算出処理
  let avg: number | null = null;
  const sections = props.sheet.section?.items;
  if (sections) {
    const data = sections.map((section) => {
      let ret: (number | null)[] = [];
      // カテゴリ別の進捗率の平均値を算出
      if (section?.objective?.items) {
        ret = section.objective.items.map((obj) => {
          return obj?.progress || obj?.progress === 0 ? obj.progress : 0;
        });
      }
      return ret;
    });

    // 二次元の平均データをそれぞれ平均化
    const data2 = data.map((num) => {
      return calcAvg(num);
    });

    //それぞれの平均を算出
    avg = calcAvg(data2);
  }
  if (!props.sheet.id) {
    return null;
  }

  return (
    <h4>
      {avg ? (
        <MediumGage
          value={parseInt(round(avg, 2).toFixed(1))}
          id={createGaugeId(props.sheet.id)}
        />
      ) : null}
    </h4>
  );
};
