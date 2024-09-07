import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested } from "class-validator";
import { MedicalClientRequestDto } from "./medical-client.base.dto";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";

export class ExternalMedicalClientRequestDto extends MedicalClientRequestDto {
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => ExternalJobPositionWithKeyRequestDto)
    public readonly jobPosition: ExternalJobPositionWithKeyRequestDto;
}