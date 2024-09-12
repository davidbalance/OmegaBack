import { Type } from "class-transformer";
import { IsObject, ValidateNested, IsEmail, IsOptional } from "class-validator";
import { PatientRequestDto } from "./patient.base.dto";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";

export class ExternalPatientRequestDto extends PatientRequestDto {
    @IsEmail()
    public readonly email: string;

    @IsOptional()
    @IsObject()
    @ValidateNested()
    @Type(() => ExternalJobPositionWithKeyRequestDto)
    public readonly jobPosition?: ExternalJobPositionWithKeyRequestDto;
}