import { OmitType, PartialType } from "@nestjs/mapped-types";
import { MedicalClientRequestDto } from "./base.medical-client.request.dto";

export class PatchMedicalClientRequestDto extends PartialType(OmitType(MedicalClientRequestDto, ['email', 'role', 'dni'])) { }