import { OmitType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { CompanyRequestDto } from "./company.base.dto";
import { ExternalCorporativeGroupWithKeyRequestDto } from "@/location/corporative-group/dtos/request/external-corporative-group-with-key.base.dto";

export class ExternalCompanyRequestDto extends OmitType(CompanyRequestDto, ['corporativeGroup']) {
  @IsDefined()
  @IsObject()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ExternalCorporativeGroupWithKeyRequestDto)
  public readonly corporativeGroup: ExternalCorporativeGroupWithKeyRequestDto
}