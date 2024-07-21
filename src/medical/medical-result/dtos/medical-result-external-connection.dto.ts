import { Expose, Type } from "class-transformer";

class MedicalResultReportExternalConnectionResponseDto {
    @Expose()
    public readonly hasFile: boolean;
}

export class MedicalResultExternalConnectionResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly hasFile: boolean;

    @Type(() => MedicalResultReportExternalConnectionResponseDto)
    @Expose()
    public readonly report?: MedicalResultReportExternalConnectionResponseDto
}