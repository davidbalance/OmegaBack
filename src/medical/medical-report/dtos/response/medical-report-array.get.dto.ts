import { ObjectArrayResponse } from "@/shared/utils/bases/base.object-array.interface";
import { MedicalReport } from "./medical-report.base.dto";
import { Expose, Type } from "class-transformer";

export class GetMedicalReportArrayResponseDto implements ObjectArrayResponse<MedicalReport> {
    @Type(() => MedicalReport)
    @Expose() public readonly data: MedicalReport[];
}
