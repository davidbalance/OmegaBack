import { DoctorRequestDto } from "@/user/doctor/dtos/request/doctor.base.dto";
import { Transform, Type } from "class-transformer";
import { IsBase64, IsDefined, IsMimeType, IsNotEmpty, IsNotEmptyObject, IsObject, ValidateNested } from "class-validator";

export class PostExternalMedicalOrderResultBase64RequestDto {
    @IsDefined()
    @IsObject()
    @IsNotEmptyObject()
    @ValidateNested()
    @Transform(({ value }) => value)
    @Type(() => DoctorRequestDto)
    public readonly doctor: DoctorRequestDto;

    @IsBase64()
    @IsNotEmpty()
    public readonly base64: string;

    @IsMimeType()
    @IsNotEmpty()
    public readonly mimetype: string;
}