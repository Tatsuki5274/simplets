import {
  Objective,
  Report,
  Section,
  Sheet,
  UpdateObjectiveInput,
  UpdateReportInput,
  UpdateSectionInput,
  UpdateSheetInput,
} from "../../API";
import {
  updateObjective,
  updateReport,
  updateSection,
  updateSheet,
} from "../../graphql/mutations";
import { SheetDao } from "../../libs/dao/sheetDao";
import { SectionDao } from "../../libs/dao/sectionDao";
import { ObjectiveDao } from "../../libs/dao/objectiveDao";
import { ReportDao } from "../../libs/dao/reportDao";

export default async function (
  sheets: (Sheet | null)[],
  sections: (Section | null)[],
  objectives: (Objective | null)[],
  reports: (Report | null)[]
) {
  // シートの更新処理を実施
  const funcs = [
    Promise.all(
      sheets.map(async (sheet) => {
        if (!sheet?.id) return;

        const params: UpdateSheetInput = {
          id: sheet.id,
          secondReviewers: sheet.secondReviewers || [],
          topReviewers: sheet.topReviewers || [],
          referencer: sheet.referencer || [],
        };
        const updatedSheet = await SheetDao.update(updateSheet, params);

        // const updateI: UpdateSheetMutationVariables = {
        //   input: params,
        // };
        // const updatedSheet = await client.mutate(updateSheet, updateI);
        if (!updatedSheet) {
          throw new Error(`Error sheet: ${sheet.id}`);
        }
        // eslint-disable-next-line no-console
        console.log(`Done updateSheet: ${sheet.id}`);
      })
    ),
    // セクションの更新処理を実施
    Promise.all(
      sections.map(async (section) => {
        if (!section?.id) return;

        const params: UpdateSectionInput = {
          id: section.id,
          secondReviewers: section.secondReviewers || [],
          topReviewers: section.topReviewers || [],
          referencer: section.referencer || [],
        };
        const updatedSection = await SectionDao.update(updateSection, params);
        // const updateI: UpdateSectionMutationVariables = {
        //   input: params,
        // };
        // const updatedSection = await client.mutate(updateSection, updateI);
        if (!updatedSection) {
          throw new Error(`Error section: ${section.id}`);
        }
        // eslint-disable-next-line no-console
        console.log(`Done updateSection: ${section.id}`);
      })
    ),

    // 目標の更新処理を実施
    Promise.all(
      objectives.map(async (objective) => {
        if (!objective?.id) return;

        const params: UpdateObjectiveInput = {
          id: objective.id,
          secondReviewers: objective.secondReviewers || [],
          topReviewers: objective.topReviewers || [],
          referencer: objective.referencer || [],
        };
        const updatedObjective = await ObjectiveDao.update(
          updateObjective,
          params
        );
        // const updateI: UpdateObjectiveMutationVariables = {
        //   input: params,
        // };
        // const updatedObjective = await client.mutate(updateObjective, updateI);
        if (!updatedObjective) {
          throw new Error(`Error objective: ${objective.id}`);
        }
        // eslint-disable-next-line no-console
        console.log(`Done updateObjective: ${objective.id}`);
      })
    ),

    // 報告書の更新処理を実施
    Promise.all(
      reports.map(async (report) => {
        if (!report?.id) return;

        if (report.date && report.sub) {
          const params: UpdateReportInput = {
            id: report.id,
            reviewer: report.reviewer || [],
            referencer: report.referencer || [],
          };
          const updatedReport = await ReportDao.update(updateReport, params);
          // const updateI: UpdateReportMutationVariables = {
          //   input: params,
          // };
          // const updatedReport = await client.mutate(updateReport, updateI);
          if (!updatedReport) {
            throw new Error(`Error report: ${report.id}`);
          }
          // eslint-disable-next-line no-console
          console.log(`Done updateReport: ${report.id}`);
        }
      })
    ),
  ];

  await Promise.all(
    funcs.map(async (func) => {
      await func;
    })
  );
}
