import { ApiProperty } from "@nestjs/swagger";

export class PatchExternalMedicalOrderFileRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    public readonly file: Express.Multer.File
}