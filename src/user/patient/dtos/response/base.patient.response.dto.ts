import { Expose } from "class-transformer";
import { OmitType } from "@nestjs/mapped-types";
import { UserResponseDto } from "@/user/user/dtos/response/base.user.response.dto";

export class PatientResponseDto extends OmitType(UserResponseDto, ['hasCredential', 'email']) {
    @Expose() public readonly birthday: Date;
    @Expose() public readonly gender: string;
    @Expose() public readonly user: number;
}