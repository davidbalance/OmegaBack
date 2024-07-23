import { PostJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/post.job-position-with-key.request.dto";
import { Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested } from "class-validator";
import { MedicalClientRequestDto } from "./base.medical-client.request.dto";

export class PostMedicalClientRequestDto extends MedicalClientRequestDto {
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => PostJobPositionWithKeyRequestDto)
    public readonly jobPosition: PostJobPositionWithKeyRequestDto;
}