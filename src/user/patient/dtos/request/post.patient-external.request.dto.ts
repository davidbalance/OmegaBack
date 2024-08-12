import { PostJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/post.job-position-with-key.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested, IsEmail } from "class-validator";
import { PatientRequestDto } from "./base.patient.request.dto";

export class PostPatientExternalRequestDto extends PatientRequestDto {
    @IsEmail()
    public readonly email: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostJobPositionWithKeyRequestDto)
    public readonly jobPosition: PostJobPositionWithKeyRequestDto;
}