import React from "react";
import styled from "styled-components";
import Text from "views/components/common/atoms/Text";

const CommentStyle = styled.p({
  color: "red",
});

export default function (): JSX.Element {
  return (
    <Text>
      <p>
        <CommentStyle>
          <p>
            すべての社員情報の変更が完了したら「変更反映」ボタンを押下して、変更情報を確定してください。
            <br />
            社員情報の変更終了後、処理結果はメールにて送信されますので、確認をお願いいたします。（15分程度かかる場合があります）
            <br />
            処理結果がエラーの場合はsimplets_desk@sisco-consulting.co.jpまでご連絡をお願いいたします。
          </p>
        </CommentStyle>
      </p>
    </Text>
  );
}
