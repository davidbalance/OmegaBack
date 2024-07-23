import { IsDefined, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { PostExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/post.exam-with-key.request.dto";
import { POSTMedicalOrderWithExternalKeyRequestDto } from "@/medical/medical-order/dtos/post.medical-order-external-connection.dto";
import { POSTDoctorRequestDto } from "@/user/doctor/dtos/post.doctor-management.dto";
import { Transform, Type } from "class-transformer";

export class POSTMedicalResultExternalRequestDto {

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
    @Type(() => POSTMedicalOrderWithExternalKeyRequestDto)
    public readonly order: POSTMedicalOrderWithExternalKeyRequestDto;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    public readonly file?: Express.Multer.File
}