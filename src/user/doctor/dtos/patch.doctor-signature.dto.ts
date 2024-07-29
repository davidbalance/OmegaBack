import { ApiProperty } from "@nestjs/swagger";

export class PATCHDoctorSignatureRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    signature: Express.Multer.File;
}

export class PATCHDoctorSignatureResponseDto { }