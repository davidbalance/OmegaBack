import { ApiProperty } from "@nestjs/swagger";

export class MedicalResultFileRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    public readonly file: Express.Multer.File;
}