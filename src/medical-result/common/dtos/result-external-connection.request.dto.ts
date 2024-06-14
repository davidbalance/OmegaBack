import { CreateDoctorExternalRequestDTO } from "@/user/common";
import { Transform, Type } from "class-transformer";
import { IsString, IsNotEmpty, IsDefined, IsObject, IsNotEmptyObject, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { POSTExamRequestDTO } from "@/laboratory/exam/dtos/external-connection.request.dto";
import { POSTMedicalOrderRequestDTO } from "./order-external-connection.request.dto";

export class POSTMedicalResultRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => POSTExamRequestDTO)
    public readonly exam: POSTExamRequestDTO;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => CreateDoctorExternalRequestDTO)
    public readonly doctor: CreateDoctorExternalRequestDTO;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => POSTMedicalOrderRequestDTO)
    public readonly order: POSTMedicalOrderRequestDTO;
}

export class POSTMedicalResultFileRequestDTO extends POSTMedicalResultRequestDTO {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File;
}