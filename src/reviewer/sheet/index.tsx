import React, { useState, useEffect, createContext } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from "@aws-amplify/api";
import {  } from 'react-router';
import { Sheet, Section} from 'App';
import { GetSheetQuery } from 'API';
import { updateObjective } from 'graphql/mutations';
import * as APIt from 'API';
import { getSheet } from 'graphql/queries';
import HeaderComponents from 'common/header';
import { ReviewerSheetPagesStatus2 } from './detail/pages/2.approval';
import { ReviewerSheetPagesReadonly } from './detail/pages/readonly';
import { ReviewerSheetPagesStatus3 } from './detail/pages/3.interview';
import { ReviewerSheetPagesStatus10 } from './detail/pages/10.result';
import { ReviewerSheetPagesStatus12Second } from './detail/pages/12.confirm/second';
import { ReviewerSheetPagesStatus12Top } from './detail/pages/12.confirm/top';
import { ReviewerSheetPagesStatus13 } from './detail/pages/13.firstComment';

export const SheetContext = createContext<
    {
        sheet: Sheet | null,
        setSheet: 
            (React.Dispatch<React.SetStateAction<Sheet | undefined>>)
            | null | undefined 
    }
>({sheet: null, setSheet: null})

//propsの型を指定
type Props = {
    match: {
        params: {
            sheetId: string
        }
    }
}

function EvalutionScreen(props: Props) {
    const sheetId = props.match.params.sheetId;

    // sheet 情報取得
    const [sheet, setSheet] = useState<Sheet>()

    useEffect(() => {
        ; (async () => {
            //const sheetId = props.match.params.sheetId;

            const input: APIt.GetSheetQueryVariables = {
                id: sheetId
            }
            let response;
            try {
                response = (await API.graphql(graphqlOperation(getSheet, input))
                ) as GraphQLResult<GetSheetQuery>;
            } catch (e) {
                console.log("エラーを無視しています", e)
                response = e;
            }
            const sheetItem: Sheet = response.data?.getSheet as Sheet;
            setSheet(sheetItem);
        })()
    }, [sheetId]);

    // lastEvalutation 更新
    async function handleChangeObjective(event: any) {

        // ObjectiveId 取得
        console.log(event.target.getAttribute('data-objective-id'));
        const objectiveId = event.target.getAttribute('data-objective-id');

        // lastEvaluation value 取得
        console.log(event.currentTarget.value);
        const objectiveLastEvaluation = parseInt(event.currentTarget.value);

        const updateI: APIt.UpdateObjectiveInput = {
            id: objectiveId,
            lastEvaluation: objectiveLastEvaluation,
        };
        const updateMV: APIt.UpdateObjectiveMutationVariables = {
            input: updateI,
        };
        const updateR: GraphQLResult<APIt.UpdateObjectiveMutation> =
            await API.graphql(graphqlOperation(updateObjective, updateMV)) as GraphQLResult<APIt.UpdateObjectiveMutation>;
        console.log("updateR", updateR);
        console.log("sheet", sheet)
    }




    if (sheet === undefined) return <div>Loading...</div>
    else if (sheet === null) {
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
    }


    //カテゴリ情報のnoを元に昇順でソート
    const sectionItems = sheet.section?.items as Section[];
    sectionItems?.sort(function (a, b) {
        if (a?.category?.no! > b?.category?.no!) {
            return 1;
        } else {
            return -1;
        }
    });
    return (
        <div>
            <SheetContext.Provider value={{sheet: sheet, setSheet: setSheet}}>
                <HeaderComponents />            

                {(() => {
                    if(sheet.statusValue === 2){
                        // 所属長が変更可能なコンポーネントを返却
                        return <ReviewerSheetPagesStatus2 />
                    }else if(sheet.statusValue === 3){
                        // 所属長が変更可能なコンポーネントを返却
                        return <ReviewerSheetPagesStatus3 sheet={sheet} sections={sectionItems} handleUpdateObjective={handleChangeObjective} />
                    }else if(sheet.statusValue === 10){
                        // 所属長が変更可能なコンポーネントを返却
                        return <ReviewerSheetPagesStatus10 sections={sectionItems} handleUpdateObjective={handleChangeObjective} />
                    }else if(sheet.statusValue === 12){
                        if(sheet.reviewers){
                            if(sheet.reviewers.length === 2){
                                // 読み取り専用のコンポーネントを返却
                                return <ReviewerSheetPagesStatus12Second />
                            }else if(sheet.reviewers.length === 3){
                                // 読み取り専用のコンポーネントを返却
                                return <ReviewerSheetPagesStatus12Top />
                            }else{
                                console.error("評価者の数が不正です。読み取り専用を表示します。")
                                return <ReviewerSheetPagesReadonly sheet={sheet} sections={sectionItems} />
                            }
                        }else{
                            console.error("評価者が登録されていません。読み取り専用を表示します。")
                            return <ReviewerSheetPagesReadonly sheet={sheet} sections={sectionItems} />
                        }

                    }else if(sheet.statusValue === 13){
                        // 部門長が変更可能なコンポーネントを返却
                        return <ReviewerSheetPagesStatus13 />
                    }else if(sheet.statusValue === 14){
                        // 読み取り専用のコンポーネントを返却
                        return <ReviewerSheetPagesReadonly sheet={sheet} sections={sectionItems} />
                    }else {
                        // 想定してない承認ステータスの場合は読み取り専用コンポーネントを返却する
                        return <ReviewerSheetPagesReadonly sheet={sheet} sections={sectionItems} />
                    }
                })()}
            </SheetContext.Provider>




            {/* <Button>保存</Button> */}
                {/* 承認ステータスが2または10の時に「保存して承認」ボタンを表示 */}
                {/* {(() => {
                    if (sheet.statusValue === 2 || sheet.statusValue === 10) {
                        return (
                            <span>
                                <Button type="submit">保存して承認</Button>
                            </span>
                        )
                    }
                })()} */}
                {/* 承認ステータスが2か3か10か12の時に「差し戻し」ボタンを表示 */}
                {/* {(() => {
                    if (sheet.statusValue === 2 || sheet.statusValue === 3 || sheet.statusValue === 10 || sheet.statusValue === 12) {
                        return (
                            <span>
                                <Button onClick={handleShow}>差し戻し</Button>
                            </span>
                        )
                    }
                })()} */}
                {/* 承認ステータスが12かつ部門長が存在すれば「部門長承認依頼」ボタン、部門長が存在しなければ「最終承認」ボタンを表示 */}
                {/* {(() => {
                    if (sheet.statusValue === 12) {
                        if (sheet.revieweeEmployee?.superior?.superior?.superior) {
                            return (
                                <span>
                                    <Button type="submit">部門長承認依頼</Button>
                                </span>
                            )
                        } else {
                            return (
                                <span>
                                    <Button type="submit">最終承認</Button>
                                </span>
                            )
                        }
                    }
                })()} */}
                {/* 承認ステータスが13の時に「最終承認」ボタンを表示 */}
                {/* {(() => {
                    if (sheet.statusValue === 13) {
                        return (
                            <span>
                                <Button type="submit">最終承認</Button>
                            </span>
                        )
                    }
                })()}                                 */}


        </div>
    );
}

export default EvalutionScreen;
