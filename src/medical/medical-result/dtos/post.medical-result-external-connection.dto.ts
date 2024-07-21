import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { MedicalResultExternalConnectionResponseDto } from "./medical-result-external-connection.dto";
import { POSTMedicalResultRequestDto } from "./post.medical-result.dto";
import { IsString, IsNotEmpty, IsOptional, IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { POSTMedicalOrderWithExternalKeyRequestDto } from "@/medical/medical-order/dtos/post.medical-order-external-connection.dto";
import { Transform, Type } from "class-transformer";

export class POSTMedicalResultFileResponseDto extends MedicalResultExternalConnectionResponseDto { }

export class POSTMedicalResultWithExternalKeyRequestDto
    extends POSTMedicalResultRequestDto
    implements ExternalConnectionRequest {

    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => POSTMedicalOrderWithExternalKeyRequestDto)
    public readonly order: POSTMedicalOrderWithExternalKeyRequestDto;

    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly source: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    public readonly file?: Express.Multer.File
}