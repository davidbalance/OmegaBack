import { POSTExamRequestDto } from "@/laboratory/exam/dtos/exam.request.dto";
import { POSTMedicalOrderRequestDto } from "@/medical/medical-order/dtos/medical-order.request.dto";
import { POSTDoctorRequestDto } from "@/user/doctor/dtos/doctor.request.dto";
import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsNotEmptyObject, IsNumber, IsObject, IsString, ValidateNested } from "class-validator";

export class POSTMedicalResultRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => POSTExamRequestDto)
    public readonly exam: POSTExamRequestDto;

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

export class POSTMedicalResultFileRequestDto extends POSTMedicalResultRequestDto {
    @ApiProperty({ type: 'string', format: 'binary', nullable: true })
    file?: Express.Multer.File;
}

export class PATCHMedicalResultWithDiseaseRequestDto {
    @IsNumber()
    public readonly diseaseId: number;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseName: string;

    @IsNumber()
    public readonly diseaseGroupId: number;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseGroupName: string;
}

export class PATCHMedicalResultFileRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File;
}