import { CreateExamExternalRequestDTO } from "@/laboratory/exam/dtos/exam-external-connection.request.dto";
import { CreateDoctorExternalRequestDTO } from "@/user/common";
import { Transform, Type } from "class-transformer";
import { IsString, IsNotEmpty, IsDefined, IsObject, IsNotEmptyObject, ValidateNested } from "class-validator";
import { CreateOrderExternalRequestDTO } from "./order-external-connection.request.dto";
import { ApiProperty } from "@nestjs/swagger";

export class CreateResultExternalRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => CreateExamExternalRequestDTO)
    public readonly exam: CreateExamExternalRequestDTO;

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
    @Type(() => CreateOrderExternalRequestDTO)
    public readonly order: CreateOrderExternalRequestDTO;
}

export class CreateResultExternalRequestExtendedDTO extends CreateResultExternalRequestDTO {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: Express.Multer.File;
}