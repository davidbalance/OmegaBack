import { OmitType, PartialType } from "@nestjs/mapped-types";
import { PatientRequestDto } from "./base.patient.request.dto";

export class PatchPatientRequestDto extends PartialType(OmitType(PatientRequestDto, ['dni', 'role'])) { }