import { IsEmail, IsNumber, IsStrongPassword } from "class-validator";

export class POSTCredentialRequestDTO {
    @IsEmail()
    public readonly email: string;

    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;

    @IsNumber()
    public readonly user: number;
}

export class PATCHCredentialPasswordChangeRequestDTO {
    @IsEmail()
    public readonly email: string;

    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
}