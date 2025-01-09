import { MedicalResultReport } from "./medical-result-report.type"

export type ExcelReportType = (Omit<MedicalResultReport, 'birthday' | 'date'> & {
    birthday: string,
    date: string,
    ageRange: string,
    diseaseFindings: string
})