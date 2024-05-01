import { ApiProperty } from "@nestjs/swagger";

export class UploadSignatureRequestDTO {
    @ApiProperty({ type: 'string', format: 'binary' })
    signature: Express.Multer.File;
}