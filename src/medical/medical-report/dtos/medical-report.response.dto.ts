import { Expose } from "class-transformer";

export class GETMedicalReportResponseDto {

    @Expose()
    public readonly id: number;

    @Expose()
    public readonly content: string;
}

export class POSTMedicalReportResponseDto extends GETMedicalReportResponseDto { }