import { OmitType } from "@nestjs/mapped-types";
import { ExternalCompanyRequestDto } from "./external-company.base.dto";

export class PatchCompanyExternalRequestDto extends OmitType(ExternalCompanyRequestDto, ['corporativeGroup']) { }