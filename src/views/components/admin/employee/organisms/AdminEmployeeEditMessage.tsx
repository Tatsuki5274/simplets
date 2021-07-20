import React from "react";
import styled from "styled-components";
import Text from "views/components/common/atoms/Text";

const SpaceStyle = styled.p({
  textIndent: "-1em",
  marginLeft: "1em",
});

const TripleSpaceStyle = styled.p({
  textIndent: "-3em",
  marginLeft: "3em",
});

export default function () {
  return (
    <Text>
      <p>
        <p>社員マスタに登録されている社員情報の変更・削除が実施できます。</p>
        <p>変更：社員情報の変更が適用されます。</p>
        <SpaceStyle>
          ・[等級]を変更した場合
          <br />
          今期評価中のシートが存在する場合、
          <br />
          今期評価中のシートの等級情報が更新されます。
          <br />
          ※今期評価完了済みのシートや過去のシートには変更内容は適用されません。
        </SpaceStyle>
        <SpaceStyle>
          ・[所属部署]を変更した場合
          <br />
          今期評価中のシートが存在する場合、
          <br />
          今期評価中のシートの所属部署情報が更新されます。
          <br />
          ※今期評価完了済みのシートや過去のシートには変更内容は適用されません。
        </SpaceStyle>
        <TripleSpaceStyle>
          削除：社員情報を削除することができます。
          <br />
          社員情報、社員が作成した業績評価シート及び作業報告が削除されます。
        </TripleSpaceStyle>
        <p>
          ※対象社員に部下が存在する場合、社員情報の削除をすることができません。
        </p>
      </p>
    </Text>
  );
}
