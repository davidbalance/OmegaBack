import { IsDefined, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PostExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/post.exam-with-key.request.dto";
import { POSTDoctorRequestDto } from "@/user/doctor/dtos/post.doctor-management.dto";
import { Transform, Type } from "class-transformer";
import { PostMedicalResultWithKeyExternalRequestDto } from "./post.medical-result-with-key.dto";

export class PostMedicalResultExternalRequestDto {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => PostExamWithKeyRequestDto)
    public readonly exam: PostExamWithKeyRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => POSTDoctorRequestDto)
    public readonly doctor: POSTDoctorRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => PostMedicalResultWithKeyExternalRequestDto)
    public readonly order: PostMedicalResultWithKeyExternalRequestDto;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    public readonly file?: Express.Multer.File
}