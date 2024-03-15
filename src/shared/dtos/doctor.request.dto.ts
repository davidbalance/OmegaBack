import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Max } from "class-validator";

export class CreateDoctorRequestDTO {
    @IsEmail()
    public readonly email: string;
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
    @IsString()
    @Length(10, 10)
    public readonly dni: string;
    @IsString()
    @Max(64)
    public readonly name: string;
    @IsString()
    @Max(64)
    public readonly lastname: string;
    @IsString()
    @IsNotEmpty()
    public signature: string;
}

export class UpdateDoctorRequestDTO {
    @IsEmail()
    @IsOptional()
    public readonly email?: string;
    @IsString()
    @Max(64)
    public readonly name: string;
    @IsString()
    @Max(64)
    public readonly lastname: string;
    @IsString()
    @IsNotEmpty()
    public signature: string;
}