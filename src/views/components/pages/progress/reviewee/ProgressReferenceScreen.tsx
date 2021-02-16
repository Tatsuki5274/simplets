import { EmployeeContext, UserContext } from "App";
import { listGroups, listSheets } from "graphql/queries";
import { GroupDao } from "lib/dao/groupDao";
import { SheetDao } from "lib/dao/sheetDao";
import { calcAvg, createGaugeId, getSectionKeys, getSheetKeys, getThisYear } from "lib/util";
import React, { useContext, useEffect, useState } from "react";
import { routeBuilder } from "router";
import { SelectLabel } from "views/components/atoms/Types";
import { HeaderProps } from "views/components/organisms/common/Header";
import { ProgressReferenceType } from "views/components/organisms/progress/ProgressCard";
import ProgressReference from "views/components/templates/progress/reviewee/ProgressReference";

export default function () {
    const [cardData, setCardData] = useState<(ProgressReferenceType | null)[] | null>(null);
    const [initCardData, setInitCardData] = useState<(ProgressReferenceType | null)[] | null>(null);

    const [header, setHeader] = useState<HeaderProps | null>(null)
    const [years, setYears] = useState<number[] | null>(null)
    const [groups, setGroups] = useState<SelectLabel[] | null>(null)

    const currentUser = useContext(UserContext);
    const currentEmployee = useContext(EmployeeContext);

    useEffect(() => {
        // ヘッダー用社員情報の取得
        if (currentEmployee) {
            const header: HeaderProps = {
                companyName: currentEmployee.company?.name,
                groupName: currentEmployee.group?.name,
                lastName: currentEmployee.lastName,
                firstName: currentEmployee.firstName
            }
            setHeader(header)

            const startMonth = currentEmployee.company?.startMonth
            if (startMonth) {
                const thisYear = getThisYear(startMonth)
                const yearList: number[] = []
                for (let i = 0; i < 5; i++) {
                    yearList.push(thisYear - i)
                }
                setYears(yearList)
            }
        }
    }, [currentEmployee])

    useEffect(() => {
        // 部署情報の取得
        (async () => {
            if (currentUser) {
                const groups = await GroupDao.list(listGroups, { companyID: currentUser.attributes["custom:companyId"] })
                if (groups) {
                    const groupAll: SelectLabel[] = [
                        {
                            label: "全て",
                            value: "all"
                        }
                    ]
                    const groupsLabel: SelectLabel[] = groups.map(group => {
                        return {
                            label: group.name || "",
                            value: group.localID || ""
                        }
                    })
                    setGroups(groupAll.concat(groupsLabel))
                }
            }
        })()
    }, [currentUser])

    useEffect(() => {
        (async () => {
            if (currentUser && years) {
                const sheets = await SheetDao.list(listSheets, { companyID: currentUser.attributes["custom:companyId"], })
                if (sheets) {
                    const result = sheets.map(sheet => {
                        const data: ProgressReferenceType = {
                            groupId: sheet.group ? sheet.group.localID || "" : "",
                            year: sheet.year || -1, // unsafe
                            employeeId: sheet.revieweeEmployee ? sheet.revieweeEmployee.localID || "" : "",
                            employeeName: sheet.revieweeEmployee ? sheet.revieweeEmployee.lastName || "" + sheet.revieweeEmployee.firstName || "" : "",
                            groupName: sheet.group ? sheet.group.name || "" : "",
                            avg: 1,
                            gaugeId: sheet.group ? createGaugeId(`chart-${sheet.group?.localID}-${getSheetKeys(sheet)}`) : null,
                            statusValue: sheet.statusValue || 0,
                            dest: routeBuilder.reviewerDetailPath(sheet.companyID || "", sheet.reviewee || "", sheet.year?.toString() || ""),   // unsafe
                            objective: sheet.section?.items?.map(sec => {
                                if (sec && sec.sectionCategoryLocalId) {
                                    
                                    const data = {
                                        categoryId: sec.sectionCategoryLocalId,
                                        categoryName: sec.sectionCategoryName || "",
                                        avg: sec && sec.objective && sec.objective.items ?
                                            calcAvg(sec.objective.items.map((obj) => {

                                                return obj ? obj.progress || null : null
                                            })) : null,
                                        gaugeId: createGaugeId(`chart-${getSectionKeys(sec)}`),
                                    }
                                    return data
                                }
                                return null
                            }) || null
                        }
                        data.avg = data.objective ? calcAvg(data.objective.map(objective => {
                            return (objective && objective.avg !== 0) || objective ? objective.avg : null
                        })) : null
                        return data
                    })
                    result.sort(function (a, b) {
                        // 部署コードの照準、社員番号の昇順にソート
                        if (a.groupId > b.groupId) return 1
                        if (a.groupId < b.groupId) return -1
                        if (a.employeeId > b.employeeId) return 1
                        if (a.employeeId < b.employeeId) return -1
                        return 0
                    })
                    setInitCardData(result);
                    const filteredResult = result.filter(record => {
                        return record.year === years[0]
                    })
                    setCardData(filteredResult);
                }
            }
        })()
    }, [currentUser, years])
    return (
        <ProgressReference
            cardData={cardData}
            setCardData={setCardData}
            initCardData={initCardData}
            data={{
                header: header,
                years: years,
                groups: groups
            }}
        />
    )
}