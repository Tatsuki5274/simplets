import { ErrorContext, UserContext } from "App";
import React, { useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { SheetContext } from "../../..";
import * as APIt from "API";
import { SheetDao } from "lib/dao/sheetDao";
import { tableHeaderStyle } from "common/globalStyle.module.scss";
import { listSheetsReviewee } from "graphql/queries";

// const listSheetReviewee = /* GraphQL */ `
//   query ListSheetReviewee(
//     $companyID: ID
//     $reviewee: ModelStringKeyConditionInput
//     $sortDirection: ModelSortDirection
//     $filter: ModelSheetFilterInput
//     $limit: Int
//     $nextToken: String
//   ) {
//     listSheetReviewee(
//       companyID: $companyID
//       reviewee: $reviewee
//       sortDirection: $sortDirection
//       filter: $filter
//       limit: $limit
//       nextToken: $nextToken
//     ) {
//       items {
//         year
//         overAllEvaluation
//       }
//       nextToken
//     }
//   }
// `;

export const OverEvaluationTableStatus10 = () => {
  const currentUser = useContext(UserContext);
  const context = useContext(SheetContext);
  const sheet = context.sheet;
  const setError = useContext(ErrorContext);
  const setSheet = context.setSheet;
  const [previousPeriod, setPreviousPeriod] = useState<(number | null)[]>([
    null,
    null,
  ]);

  useEffect(() => {
    (async () => {
      // 前期と前々期を取得
      if (sheet) {
        const thisYear = sheet.year || 0; // unsafe

        if (currentUser) {
          const input: APIt.ListSheetsRevieweeQueryVariables = {
            sub: currentUser.attributes["sub"],
            year: {
              between: [thisYear - 2, thisYear - 1],
            },
          };
          const gotSheets = await SheetDao.listReviewee(
            listSheetsReviewee,
            input
          );
          if (gotSheets) {
            if (gotSheets.length > 2) {
              setError(
                "業績評価年度に重複があります。前期前々期の記録に想定されない値が格納される場合があります。"
              );
            }
            const results: (number | null)[] = [null, null];

            // 前期の記録を取得
            results[0] =
              gotSheets.find((sheet) => {
                return sheet?.year === thisYear - 1;
              })?.overAllEvaluation || null;
            // 前々期の記録を取得
            results[1] =
              gotSheets.find((sheet) => {
                return sheet?.year === thisYear - 2;
              })?.overAllEvaluation || null;

            setPreviousPeriod(results);
          }
        }
      }
    })();
  }, [sheet, currentUser, setError]);

  if (sheet && setSheet) {
    return (
      <Table bordered hover>
        <thead className={tableHeaderStyle}>
          <tr>
            <td>前々期</td>
            <td>前期</td>
            <td>今期</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{previousPeriod[1] || "-"}</td>
            <td>{previousPeriod[0] || "-"}</td>
            <td>未評価</td>
          </tr>
        </tbody>
      </Table>
    );
  } else {
    return null;
  }
};
