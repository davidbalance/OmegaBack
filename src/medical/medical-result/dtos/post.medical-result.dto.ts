import { POSTDoctorRequestDto } from "@/user/doctor/dtos/post.doctor-management.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsObject, IsNotEmptyObject, ValidateNested } from "class-validator";
import { MedicalResult } from "../entities/medical-result.entity";
import { POSTMedicalOrderRequestDto } from "@/medical/medical-order/dtos/post.medical-order.dto";
import { PostExamExternalRequestDto } from "@/laboratory/exam/dtos/request/post.exam-external.request.dto";
import { PostExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/post.exam-with-key.request.dto";

export class POSTMedicalResultRequestDto {
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
    @Type(() => POSTMedicalOrderRequestDto)
    public readonly order: POSTMedicalOrderRequestDto;
}

export class POSTMedicalResultResponseDto extends MedicalResult { };

export class POSTMedicalResultFileRequestDto extends POSTMedicalResultRequestDto {
    @ApiProperty({ type: 'string', format: 'binary', nullable: true })
    file?: Express.Multer.File;
}