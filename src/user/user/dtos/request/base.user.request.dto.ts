import { IsString, IsNotEmpty, IsEmail, Length, IsOptional } from "class-validator";

export class UserRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;

    @IsEmail()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    @Length(10, 10)
    public readonly dni: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    public readonly role?: string;
}