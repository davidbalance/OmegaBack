import { ApiProperty } from "@nestjs/swagger";

export class PatchDoctorSignatureRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    signature: Express.Multer.File;
}