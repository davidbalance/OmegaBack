import { OmitType, PartialType } from "@nestjs/mapped-types";
import { DoctorRequestDto } from "./base.doctor.request.dto";

export class PatchDoctorRequestDto extends PartialType(OmitType(DoctorRequestDto, ['dni', 'email'])) { }