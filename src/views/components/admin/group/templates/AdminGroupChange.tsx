import React from "react";

import AdminChangeGroupForm from "views/components/admin/group/organisms/AdminChangeGroupForm";
import { LinkType } from "views/components/common/atoms/Types";
import Title from "views/components/common/molecules/Title";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import Container from "../../../common/templates/Container";
import AdminDeleteGroup from "../organisms/AdminDeleteGroup";
import Text from "views/components/common/atoms/Text";
import styled from "styled-components";

const SpaceStyle = styled.p({
  textIndent: "-1em",
  marginLeft: "1em",
});

type Props = {
  header: HeaderProps | null;
  sidebar: LinkType[][] | null;

  companyId: string;
  groupNo: string;
  groupId: string;
  groupName: string;
  id: string;
};

export default function (props: Props): JSX.Element {
  return (
    <>
      <Header {...props.header} />
      <Container>
        <LeftBox>
          <>{props.sidebar ? <Sidebar data={props.sidebar} /> : null}</>
        </LeftBox>
        <RightBox>
          <Content>
            <>
              <Title>部署変更・削除</Title>
              <AdminChangeGroupForm {...props} />
              <AdminDeleteGroup {...props} />
              <Text>
                <p>
                  <p>部署名の変更、部署情報の削除が可能です。</p>
                  <SpaceStyle>
                    ※変更した部署名は今期の評価中のシートにのみ適用されます。
                    <br />
                    今期の評価完了済みのシートや過去年度のシートには変更内容は適用されません。
                  </SpaceStyle>
                </p>
              </Text>
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}
