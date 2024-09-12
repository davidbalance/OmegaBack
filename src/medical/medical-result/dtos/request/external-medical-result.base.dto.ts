import { IsDefined, IsNotEmptyObject, IsObject, IsOptional, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { ExternalMedicalOrderWithKeyRequestDto } from "@/medical/medical-order/dtos/request/external-medical-order-with-key.base.dto";
import { DoctorRequestDto } from "@/user/doctor/dtos/request/doctor.base.dto";
import { ExternalExamWithKeyRequestDto } from "@/laboratory/exam/dtos/request/external-exam-with-key.base.dto";

export class ExternalMedicalResultRequestDto {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => ExternalExamWithKeyRequestDto)
    public readonly exam: ExternalExamWithKeyRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => DoctorRequestDto)
    public readonly doctor: DoctorRequestDto;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => ExternalMedicalOrderWithKeyRequestDto)
    public readonly order: ExternalMedicalOrderWithKeyRequestDto;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    public readonly file?: Express.Multer.File
}