import React, { useState, useEffect, createContext, useContext } from 'react';
import {  } from 'react-router';
import { HeaderContext, UserContext} from 'App';
import { Section, Sheet } from 'API';
import * as APIt from 'API';
import { getSheet } from 'graphql/queries';
import { ReviewerSheetPagesStatus2 } from './detail/pages/2.approval';
import { ReviewerSheetPagesReadonly } from './detail/pages/readonly';
import { ReviewerSheetPagesStatus3 } from './detail/pages/3.interview';
import { ReviewerSheetPagesStatus10 } from './detail/pages/10.result';
import { ReviewerSheetPagesStatus12Second } from './detail/pages/12.confirm/second';
import { ReviewerSheetPagesStatus12Top } from './detail/pages/12.confirm/top';
import { ReviewerSheetPagesStatus13 } from './detail/pages/13.firstComment';
import Header from 'views/components/organisms/common/Header';
import { SheetDao } from 'lib/dao/sheetDao';

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
    // const sheetId = props.match.params.sheetId;

    // sheet 情報取得
    const currentUser = useContext(UserContext);
    const [sheet, setSheet] = useState<Sheet>()

    const header = useContext(HeaderContext);
    // const sidebar = useContext(SidebarContext)


    useEffect(() => {
        ; (async () => {

            const input: APIt.GetSheetQueryVariables = {
                id: props.match.params.sheetId,
            }
            // let response;
            // try {
            //     response = (await API.graphql(graphqlOperation(getSheet, input))
            //     ) as GraphQLResult<GetSheetQuery>;
            // } catch (e) {
            //     console.log("エラーを無視しています", e)
            //     response = e;
            // }
            // const sheetItem: Sheet = response.data?.getSheet as Sheet;
            const sheetItem = await SheetDao.get(getSheet, input)
            if(sheetItem){
                setSheet(sheetItem)
            }else{
                console.error("シートの取得に失敗しました")
            }
        })()
    }, [props.match.params.sheetId]);

    // lastEvalutation 更新
    // async function handleChangeObjective(event: any) {

    //     // ObjectiveId 取得
    //     console.log(event.target.getAttribute('data-objective-id'));
    //     const objectiveId = event.target.getAttribute('data-objective-id');
    //     const objectiveLastEvaluation = parseInt(event.currentTarget.value);

    //     // lastEvaluation value 取得
    //     console.log(event.currentTarget.value);

    //     const updateI: APIt.UpdateObjectiveInput = {
    //         // id: objectiveId,
    //         createdAt: "", //仮で空白を設定
    //         sectionKeys: "", //仮で空白を設定
    //         lastEvaluation: objectiveLastEvaluation,
    //     };
    //     const updatedObjective = await ObjectiveDao.update(updateObjective, updateI)
    //     if(updatedObjective && sheet){
    //         const applyedSheet = {...sheet}
    //         applyedSheet.section?.items?.forEach(section=>{
    //             section?.objective?.items?.forEach(objective => {
    //                 if(objective){
    //                     if(objective.sectionKeys === objectiveId){
    //                         objective.lastEvaluation = objectiveLastEvaluation
    //                     }
    //                 }
    //             });
    //         })
    //     }
    // }




    if (sheet === undefined) return <div>Loading...</div>
    else if (sheet === null) {
        console.log("sheet not found.");
        return <p>該当のシートは存在しません</p>
    }


    //カテゴリ情報のnoを元に昇順でソート
    const sectionItems = sheet.section?.items as Section[];
    sectionItems?.sort(function (a, b) {
        if (a.sectionCategoryName && b.sectionCategoryName && a.sectionCategoryName > b.sectionCategoryName) { // 仮で設定
            return 1;
        } else {
            return -1;
        }
    });
    return (
        <div>
            <SheetContext.Provider value={{sheet: sheet, setSheet: setSheet}}>
                <Header
                    {...header}
                />

                {(() => {
                    if(sheet.statusValue === 2){
                        // 所属長が変更可能なコンポーネントを返却
                        return <ReviewerSheetPagesStatus2 />
                    }else if(sheet.statusValue === 3){
                        // 所属長が変更可能なコンポーネントを返却
                        return <ReviewerSheetPagesStatus3 sheet={sheet} sections={sectionItems} />
                    }else if(sheet.statusValue === 10){
                        // 所属長が変更可能なコンポーネントを返却
                        return <ReviewerSheetPagesStatus10 sections={sectionItems}/>
                    }else if(sheet.statusValue === 12){
                        if(currentUser && sheet.secondReviewers?.includes(currentUser.username) && sheet.topReviewers === null){
                            // 部門長のコンポーネントを返却
                            return <ReviewerSheetPagesStatus12Top />
                        }else if(currentUser && sheet.secondReviewers?.includes(currentUser.username)){
                            // 所属長のコンポーネントを返却
                            return <ReviewerSheetPagesStatus12Second />
                        }else{
                            // 読み取り専用のコンポーネントを返却
                            return <ReviewerSheetPagesReadonly sheet={sheet} sections={sectionItems} />
                        }

                    }else if(sheet.statusValue === 13 && currentUser && sheet.topReviewers?.includes(currentUser.username)){
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
