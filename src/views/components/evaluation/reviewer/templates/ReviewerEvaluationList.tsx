import React from "react";
import styled from "styled-components";
import { LinkType, SelectLabel } from "views/components/common/atoms/Types";
import Header, { HeaderProps } from "views/components/common/organisms/Header";
import Container from "views/components/common/templates/Container";
import Content from "views/components/common/templates/Content";
import LeftBox from "views/components/common/templates/LeftBox";
import RightBox from "views/components/common/templates/RightBox";
import Sidebar from "views/components/common/templates/Sidebar";
import EvaluationFilter from "../organisms/EvaluationFilter";
import EvaluationListTitle from "../organisms/EvaluationListTitle";
import ProgressCsv from "../organisms/ProgressCsv";
import TableEvaluationList, {
  TableEvaluationListType,
} from "../organisms/TableEvaluationList";

type Props = {
  tableData: (TableEvaluationListType | null)[] | null;
  setTableData: React.Dispatch<
    React.SetStateAction<(TableEvaluationListType | null)[] | null>
  >;
  initTableData: (TableEvaluationListType | null)[] | null;
  data: {
    header: HeaderProps | null;
    sidebar: LinkType[][] | null;
    years: number[] | null;
    groups: SelectLabel[] | null;
  };
  selectedYear: number | null;
  setSelectedYear: React.Dispatch<React.SetStateAction<number | null>>;
};

const EvaluationListTitleStyle = styled.div({
  // paddingTop: "20px",
});

const EvaluationFilterStyle = styled.div({
  paddingTop: "20px",
});

const CSVButtonStyle = styled.div({
  margin: "10px 0",
});

export default function (props: Props): JSX.Element {
  const yearList = props.data.years?.map((year) => {
    return {
      label: `${year}年`,
      value: year.toString(),
    };
  });
  // const radioButtonMock = [{
  //     label: "DX",
  //     value: "40"
  // }, {
  //     label: "BSS",
  //     value: "20"
  // }, {
  //     label: "EMS",
  //     value: "30"
  // }]

  // const yearMock = [{
  //     label: "2020年",
  //     value: "2020"
  // }, {
  //     label: "2021年",
  //     value: "2021"
  // }]

  // const status = Object.entries(StatusString).map(([key, value]) => {
  //     return {
  //         label: key,
  //         value: value
  //     }
  // })

  const statusMock = [
    {
      label: "全て",
      value: "all",
    },
    {
      label: "目標：設定中",
      value: "1",
    },
    {
      label: "目標：所属長提出済",
      value: "2",
    },
    {
      label: "目標：所属長承認済",
      value: "3",
    },
    {
      label: "評価：社員評価提出済、所属長評価待",
      value: "10",
    },
    {
      label: "評価：所属長評価済、社員確認待",
      value: "11",
    },
    {
      label: "評価：社員確認済、所属長承認待",
      value: "12",
    },
    {
      label: "評価：所属長承認済、部門長確認待",
      value: "13",
    },
    {
      label: "評価：完了",
      value: "14",
    },
  ];

  return (
    <>
      <Header {...props.data.header} />
      <Container>
        <LeftBox>
          <>
            {props.data.sidebar ? <Sidebar data={props.data.sidebar} /> : null}
          </>
        </LeftBox>
        <RightBox>
          <Content>
            <>
              <EvaluationListTitleStyle>
                <EvaluationListTitle />
              </EvaluationListTitleStyle>
              {yearList && props.data.groups ? (
                <EvaluationFilterStyle>
                  <EvaluationFilter
                    groups={props.data.groups}
                    status={statusMock}
                    years={yearList}
                    initTableData={props.initTableData}
                    setTableData={props.setTableData}
                    setSelectedYear={props.setSelectedYear}
                  />
                </EvaluationFilterStyle>
              ) : null}
              {props.tableData ? (
                <CSVButtonStyle>
                  <ProgressCsv params={props.tableData} />
                </CSVButtonStyle>
              ) : null}
              {props.tableData ? (
                <TableEvaluationList
                  data={props.tableData}
                  selectedYear={props.selectedYear}
                />
              ) : null}
            </>
          </Content>
        </RightBox>
      </Container>
    </>
  );
}
