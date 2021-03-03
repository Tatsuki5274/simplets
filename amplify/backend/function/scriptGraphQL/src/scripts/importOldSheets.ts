import fs from 'fs'
import readline from 'readline'
import { CreateSheetMutationVariables } from '../API'
import { executeMutation } from '../client'
import { data } from '../data/sheetTable'
import { createSheet } from '../graphql/mutations'
import { getUsersFromUserPool } from './addEmployeesSub'


export default async function (isPreview = true) {
  const jsonStrs: string[] = data.split("\n")
  const users = await getUsersFromUserPool()
  let count = 0
  if (users) {
    for (const jsonStr of jsonStrs) {
      let json: any = undefined
      try {
        json = JSON.parse(jsonStr)
      } catch (e) {
        json = null
      }

      if (json) {
        const sub = users.find(user => {
          return user.username === json.Item?.reviewee.S
        })?.sub
        if (sub) {
          count++
          const param: CreateSheetMutationVariables = {
            input: {
              sub: sub,
              year: json.Item?.year?.N || null,

              companyID: json.Item?.companyID?.S || null,
              grade: json.Item?.grade?.S || null,
              careerPlan: json.Item?.careerPlan?.S || null,
              careerPlanComment: json.Item?.careerPlanComment?.S || null,
              reviewComment: json.Item?.reviewComment?.S || null,
              reviewDate: json.Item?.reviewDate?.S || null,
              selfCheckDate: json.Item?.selfCheckDate?.S || null,
              firstComment: json.Item?.firstComment?.S || null,
              firstCheckDate: json.Item?.firstCheckDate?.S || null,
              secondComment: json.Item?.secondComment?.S || null,
              secondCheckDate: json.Item?.secondCheckDate?.S || null,
              overAllEvaluation: json.Item?.overAllEvaluation?.N || null,
              statusValue: json.Item?.statusValue?.N || null,

              interviewPlanDate: json.Item?.interviewPlanDate?.S || null,
              interviewPlanComment: json.Item?.interviewPlanComment?.S || null,
              InterviewMid1Date: json.Item?.InterviewMid1Date?.S || null,
              InterviewMid1Comment: json.Item?.InterviewMid1Comment?.S || null,
              InterviewMid2Date: json.Item?.InterviewMid2Date?.S || null,
              InterviewMid2Comment: json.Item?.InterviewMid2Comment?.S || null,
              InterviewMid3Date: json.Item?.InterviewMid3Date?.S || null,
              InterviewMid3Comment: json.Item?.InterviewMid3Comment?.S || null,

              revieweeUsername: json.Item?.revieweeUsername?.S || null,
              secondUsername: json.Item?.secondUsername?.S || null,

              sheetGroupLocalId: json.Item?.sheetGroupLocalId?.S || null,
              sheetGroupName: json.Item?.sheetGroupName?.S || null,

              referencer: json.Item?.referencer?.L || null,
              reviewee: json.Item?.reviewee?.S || null,
              topReviewers: json.Item?.topReviewers?.L || null,
              secondReviewers: json.Item?.secondReviewers?.L || null,

            }
          }
          console.log("param", param)
          if(!isPreview){
            const updated = await executeMutation(createSheet, param)
            console.log("成功", updated?.errors)
          }
        }else{
          console.log("subが存在しませんでした")
        }
      }else{
        console.log("jsonの解析に失敗しました", jsonStr)
      }

    }
    console.log("正常件数", count)
  }

}