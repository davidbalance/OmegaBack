import { CreateReportValueRequestDTO } from "./report-value.request.dto";

export class CreateReportRequestDTO {
    public readonly doctor: number;
    public readonly result: number;
    public readonly values: CreateReportValueRequestDTO[];
}