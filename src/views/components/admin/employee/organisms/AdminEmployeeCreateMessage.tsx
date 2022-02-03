/* eslint-disable prettier/prettier */ // Todo delete lint ignore 
  import React from "react";
  import styled from "styled-components";
  import Text from "views/components/common/atoms/Text";
  
  const SpaceStyle = styled.p({
    textIndent: "-1em",
    marginLeft: "1em",
  });
  
  export default function (): JSX.Element {
    return (
      <Text>
        <p>
            <p>
                社員マスタに社員情報を新規登録することができます。
                <br />
                新規社員情報を登録するとSimplet&#39;sのユーザアカウントが作成されます。
            </p>
            <SpaceStyle>
                ※[社員番号]項目と[メールアドレス]項目は
                <br />
                社員マスタに登録されていない値を入力する必要があります。
                <br />
                （社員マスタに登録されている値を入力するとエラーが表示されます。）
            </SpaceStyle>
        </p>
      </Text>
    );
  }
  