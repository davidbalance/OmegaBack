import { OmitType } from "@nestjs/mapped-types";
import { ExternalMedicalResultRequestDto } from "./external-medical-result.base.dto";

export class PatchExternalMedicalResultRequestDto extends OmitType(ExternalMedicalResultRequestDto, ['doctor', 'exam', 'order']) { }