import { OmitType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsString } from "class-validator";
import { MedicalReportRequestDto } from "./base.medical-report.request.dto";

export class PATCHMedicalReportRequestDto extends OmitType(MedicalReportRequestDto, ['medicalResult']) { }