import { ApiProperty } from "@nestjs/swagger";

export class DoctorUploadFileRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    public readonly file: Express.Multer.File
}