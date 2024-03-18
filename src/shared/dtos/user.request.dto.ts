import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, Max } from "class-validator";

export class CreateUserRequestDTO {
    @IsEmail()
    public readonly email: string;

    @IsString()
    @Length(10, 10)
    public readonly dni: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;
}

export class UpdateUserDNIRequestDTO {
    @IsString()
    @Length(10, 10)
    public readonly dni: string;
}

export class UpdateUserRequestDTO {
    @IsEmail()
    @IsOptional()
    public readonly email?: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;
}