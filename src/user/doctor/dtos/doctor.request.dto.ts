import { PATCHUserRequestDto, POSTUserRequestDto } from "@/user/user/dtos/user.request.dto";
import { ApiProperty } from "@nestjs/swagger";

export class POSTDoctorRequestDto extends POSTUserRequestDto { }

export class PATCHDoctorRequestDto extends PATCHUserRequestDto { }

export class PATCHDoctorSignatureRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    signature: Express.Multer.File;
}