import { UserResponseDto } from "@/user/user/dtos/response/base.user.response.dto";
import { Expose } from "class-transformer";

export class DoctorResponseDto extends UserResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly user: number;
}