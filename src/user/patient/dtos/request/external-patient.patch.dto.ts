import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ExternalPatientRequestDto } from "./external-patient.base.dto";

export class PatchExternalPatientRequestDto extends PartialType(OmitType(ExternalPatientRequestDto, ['dni', 'role'])) { }