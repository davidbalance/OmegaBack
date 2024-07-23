import { IsEmail } from "class-validator";

export class PostMedicalEmailRequestDto {
    @IsEmail()
    public readonly email: string;
}