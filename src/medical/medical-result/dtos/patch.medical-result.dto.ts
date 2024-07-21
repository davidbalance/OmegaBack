import { ApiProperty } from "@nestjs/swagger";

export class PATCHMedicalResultFileRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    public readonly file: Express.Multer.File;
}

export class PATCHMedicalResultFileResponseDto { }