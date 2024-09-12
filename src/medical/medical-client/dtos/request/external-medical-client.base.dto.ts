import { Type } from "class-transformer";
import { IsObject, ValidateNested, IsOptional } from "class-validator";
import { MedicalClientRequestDto } from "./medical-client.base.dto";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";

export class ExternalMedicalClientRequestDto extends MedicalClientRequestDto {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ExternalJobPositionWithKeyRequestDto)
    @IsOptional()
    public readonly jobPosition?: ExternalJobPositionWithKeyRequestDto;
}