import { UserResponseDto } from "@/user/user/dtos/user.dto";
import { Expose, Type } from "class-transformer";

export class DoctorResponseDto {
    @Expose()
    public readonly id: number;

    @Type(() => UserResponseDto)
    @Expose()
    public readonly user: UserResponseDto;
}