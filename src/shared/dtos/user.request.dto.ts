import { IsEmail, IsOptional, IsString, Length, Max } from "class-validator";

export class CreateUserRequestDTO {
    @IsEmail()
    public readonly email: string;
    @IsString()
    @Length(10, 10)
    public readonly dni: string;
    @IsString()
    @Max(64)
    public readonly name: string;
    @IsString()
    @Max(64)
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
    @Max(64)
    public readonly name: string;
    @IsString()
    @Max(64)
    public readonly lastname: string;
}