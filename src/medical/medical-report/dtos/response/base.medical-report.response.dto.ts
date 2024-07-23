import { Expose } from "class-transformer";

export class MedicalReportResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly content: string;
    @Expose() public readonly hasFile: boolean;
}