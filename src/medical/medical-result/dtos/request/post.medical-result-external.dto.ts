import { IsDefined, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PostExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/post.exam-with-key.request.dto";
import { PostDoctorRequestDto } from "@/user/doctor/dtos/request/post.doctor.dto";
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
    @Type(() => PostDoctorRequestDto)
    public readonly doctor: PostDoctorRequestDto;

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