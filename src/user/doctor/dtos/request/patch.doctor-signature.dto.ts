import { ApiProperty } from "@nestjs/swagger";

<<<<<<<< HEAD:src/profile/controller/dto/request/doctor.dto.ts
export class DoctorUploadFileRequestDto {
========
export class PatchDoctorSignatureRequestDto {
>>>>>>>> main:src/user/doctor/dtos/request/patch.doctor-signature.dto.ts
    @ApiProperty({ type: 'string', format: 'binary' })
    public readonly file: Express.Multer.File
}