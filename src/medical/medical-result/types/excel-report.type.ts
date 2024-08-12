import { MedicalResultReport } from "./medical-result-report.type"

export type ExcelReportType = (MedicalResultReport & {
    ageRange: string,
    diseaseFindings: string
})