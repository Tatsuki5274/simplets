import React from "react";
import styled from "styled-components";
import Text from "views/components/common/atoms/Text";

const CommentStyle = styled.p({
  color: "red",
});

export default function () {
  return (
    <Text>
      <p>
        <CommentStyle>
          <p>
            すべての社員情報の変更が完了したら「変更反映」ボタンを押下して、変更情報を確定してください。
          </p>
        </CommentStyle>
      </p>
    </Text>
  );
}
