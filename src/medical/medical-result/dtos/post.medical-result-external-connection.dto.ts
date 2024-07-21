import { ExternalConnectionRequest } from "@/shared/utils/bases/base.external-connection";
import { MedicalResultExternalConnectionResponseDto } from "./medical-result-external-connection.dto";
import { POSTMedicalResultRequestDto } from "./post.medical-result.dto";
import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class POSTMedicalResultFileResponseDto extends MedicalResultExternalConnectionResponseDto { }


export class POSTMedicalResultExternalConnectionRequestDto
    extends POSTMedicalResultRequestDto
    implements ExternalConnectionRequest {

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