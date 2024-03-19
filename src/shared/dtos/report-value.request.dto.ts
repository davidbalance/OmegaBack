import { ReportElementType } from "src/report/common/enums";

export class CreateReportValueRequestDTO {
    public name: string;
    public type: ReportElementType;
    public value: string;
}

export class UpdateReportValueRequestDTO {
    public name: string;
    public type: ReportElementType;
    public value: string;
}