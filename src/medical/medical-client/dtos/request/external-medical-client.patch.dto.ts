import { OmitType, PartialType } from "@nestjs/mapped-types";
import { ExternalMedicalClientRequestDto } from "./external-medical-client.base.dto";

export class PatchExternalMedicalClientRequestDto extends PartialType(OmitType(ExternalMedicalClientRequestDto, ['email'])) { }