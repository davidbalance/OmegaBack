import { IsString, IsNotEmpty, Length } from "class-validator";
import { UserRequestDto } from "./user.dto";
import { GETUserResponseDto } from "./get.user-management.dto";

export class POSTUserRequestDto extends UserRequestDto {
    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly dni: string;
}

export class POSTUserResponseDto extends GETUserResponseDto { }