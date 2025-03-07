import { ReportLayoutFunc } from "@omega/medical/application/queries/test/report-get-file.query";

export const recordLayoutHelper: ReportLayoutFunc = (e) => {
    return {
        pageSize: 'A4',
        pageMargins: [30, 75, 30, 200],
        content: [JSON.stringify(e)],
    }
}