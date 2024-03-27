import { IsEmail, IsNumber, IsStrongPassword } from "class-validator";
import { CreateUserRequestDTO } from "./user.request.dto";

export class CreateUserCredentialRequestDTO extends CreateUserRequestDTO {
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