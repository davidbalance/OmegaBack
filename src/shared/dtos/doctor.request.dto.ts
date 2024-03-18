import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsStrongPassword, Length, Max } from "class-validator";
import { CreateUserRequestDTO } from "./user.request.dto";

export class FindOrCreateDoctorRequestDTO extends CreateUserRequestDTO { }

export class CreateDoctorRequestDTO extends FindOrCreateDoctorRequestDTO {
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
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