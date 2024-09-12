import { Expose, Type } from "class-transformer";
import { MedicalResultDisease } from "./medical-result.-disease.base.dto";
import { MedicalReport } from "@/medical/medical-report/dtos/response/medical-report.base.dto";
import { MedicalResult } from "./medical-result.base.dto";
import { OmitType } from "@nestjs/mapped-types";

export class ExternalMedicalResult extends OmitType(MedicalResult, ['diseases', 'reportId', 'reportHasFile']) {
    @Type(() => MedicalResultDisease)
    @Expose() public diseases?: MedicalResultDisease[]

    @Type(() => MedicalReport)
    @Expose() public readonly report?: MedicalReport
}