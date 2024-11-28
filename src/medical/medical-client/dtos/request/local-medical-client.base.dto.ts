import { Type } from "class-transformer";
import { IsObject, ValidateNested, IsOptional } from "class-validator";
import { MedicalClientRequestDto } from "./medical-client.base.dto";
import { JobPositionRequestDto } from "@/location/job-position/dtos/request/job-position.base.dto";

export class LocalMedicalClientRequestDto extends MedicalClientRequestDto {
    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => JobPositionRequestDto)
    @IsOptional()
    public readonly jobPosition?: JobPositionRequestDto;
}