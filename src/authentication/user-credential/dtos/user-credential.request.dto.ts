import { IsEmail, IsNumber, IsStrongPassword } from "class-validator";

export class CreateCredentialRequestDTO {
    @IsEmail()
    public readonly email: string;

    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;

    @IsNumber()
    public readonly user: number;
}

export class FindOneCredentialAndUpdatePasswordRequestDTO {
    @IsEmail()
    public readonly email: string;

    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
}