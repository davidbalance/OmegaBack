import { ApiProperty } from "@nestjs/swagger";

export class PatchMedicalResultFileRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    public readonly file: Express.Multer.File;
}