import { IsEmail, IsStrongPassword } from "class-validator";

export class CreateUserCredentialRequestDTO {
    @IsEmail()
    public readonly email: string;
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
}

export class UpdateUserCredentialEmailRequestDTO {
    @IsEmail()
    public readonly email: string;
}

export class UpdateUserCredentialPasswordRequestDTO {
    @IsEmail()
    public readonly email: string;
    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
}