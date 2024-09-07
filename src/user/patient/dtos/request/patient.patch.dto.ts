import { OmitType, PartialType } from "@nestjs/mapped-types";
import { PatientRequestDto } from "./patient.base.dto";

export class PatchPatientRequestDto extends PartialType(OmitType(PatientRequestDto, ['dni', 'role'])) { }