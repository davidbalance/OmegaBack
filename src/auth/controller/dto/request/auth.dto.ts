import { AuthAddApiKeyCommandPayload } from "@omega/auth/application/command/auth/auth-add-apikey.command";
import { AuthEditPasswordCommandPayload } from "@omega/auth/application/command/auth/auth-edit-password.command";
import { IsEmail, IsNotEmpty, IsString, IsStrongPassword } from "class-validator";

export class LoginRequestDto {
    @IsEmail()
    public readonly email: string;

    @IsString()
    @IsNotEmpty()
    public readonly password: string;
}

export class AuthAddApiKeyRequestDto implements Omit<AuthAddApiKeyCommandPayload, 'authId'> {
    @IsString()
    @IsNotEmpty()
    public readonly apikey: string;
}

export class AuthEditPassword implements AuthEditPasswordCommandPayload {
    @IsEmail()
    public readonly email: string;

    @IsStrongPassword({ minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 })
    public readonly password: string;
}