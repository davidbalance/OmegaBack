import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalReportResponseDto } from "./base.medical-report.response.dto";
import { Expose, Type } from "class-transformer";

export class GETMedicalReportArrayResponseDto implements ObjectArrayResponse<MedicalReportResponseDto> {
    @Expose()
    @Type(() => MedicalReportResponseDto)
    public readonly data: MedicalReportResponseDto[];
}
