import { OmitType, PartialType } from "@nestjs/mapped-types";
import { MedicalClientRequestDto } from "./medical-client.base.dto";

export class PatchMedicalClientRequestDto extends PartialType(OmitType(MedicalClientRequestDto, ['email', 'role', 'dni'])) { }