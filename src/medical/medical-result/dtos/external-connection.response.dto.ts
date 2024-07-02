import { Expose, Type } from "class-transformer";

class MedicalReportResponseDto {
    @Expose()
    public readonly id: number;
}

export class GETMedicalResultExternalConnectionResponseDto {

    @Expose()
    public readonly id: number;

    @Expose()
    public readonly hasFile: boolean;

    @Type(() => MedicalReportResponseDto)
    @Expose()
    public readonly report?: MedicalReportResponseDto
}

export class POSTMedicalResultFileResponseDto extends GETMedicalResultExternalConnectionResponseDto { }
