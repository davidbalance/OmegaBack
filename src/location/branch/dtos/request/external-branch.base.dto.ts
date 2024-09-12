import { Type } from "class-transformer";
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { BranchRequestDto } from "./branch.base.dto";
import { OmitType } from "@nestjs/mapped-types";
import { ExternalCompanyWithKeyRequestDto } from "@/location/company/dtos/request/external-company-with-key.base.dto";

export class ExternalBranchRequestDto extends OmitType(BranchRequestDto, ['company']) {
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => ExternalCompanyWithKeyRequestDto)
    public readonly company: ExternalCompanyWithKeyRequestDto
}