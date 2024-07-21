import { Expose } from "class-transformer";

export class MedicalReportResponse {
    @Expose() public readonly id: number;

    @Expose() public readonly content: string;
}