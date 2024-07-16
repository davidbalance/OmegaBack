import { PATCHUserRequestDto } from "@/user/user/dtos/patch.user-management.dto";
import { POSTUserRequestDto } from "@/user/user/dtos/post.user-management.dto";
import { ApiProperty } from "@nestjs/swagger";

export class POSTDoctorRequestDto extends POSTUserRequestDto { }

export class PATCHDoctorRequestDto extends PATCHUserRequestDto { }

export class PATCHDoctorSignatureRequestDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    signature: Express.Multer.File;
}