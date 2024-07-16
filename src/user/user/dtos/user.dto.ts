import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;

    @IsEmail()
    public readonly email: string;
}

export class UserResponseDto {
    @Expose() public readonly id: number;

    @Expose() public readonly dni: string;

    @Expose() public readonly email: string;

    @Expose() public readonly name: string;

    @Expose() public readonly lastname: string;

    @Expose() public readonly hasCredential: boolean;
}
