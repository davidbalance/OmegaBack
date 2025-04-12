import { IsEmail, IsStrongPassword } from "class-validator";

export class PatchChangePasswordRequestDto {
    @IsEmail()
    public readonly email: string;

    @IsStrongPassword({ minLength: 8 })
    public readonly password: string;
}