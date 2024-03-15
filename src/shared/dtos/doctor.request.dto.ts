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
    @IsNotEmpty()
    public readonly name: string;
    @IsString()
    @IsNotEmpty()
    public readonly lastname: string;
}

export class CreateDoctorAndAssignUserRequestDTO {
    @IsNumber()
    public readonly user: number;
}

export class UpdateDoctorRequestDTO {
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