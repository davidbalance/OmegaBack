import { ReportElementType } from "src/report/common/enums";

export class CreateRequestElementRequestDTO {
    public readonly name: string;
    public readonly type: ReportElementType;
    public readonly mandatory: boolean;
}

export class UpdateRequestElementRequestDTO {
    public readonly name: string;
    public readonly type: ReportElementType;
    public readonly mandatory: boolean;
}