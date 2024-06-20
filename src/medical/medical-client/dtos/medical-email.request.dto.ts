import { IsEmail } from "class-validator";

export class POSTMedicalEmailRequestDto {
    @IsEmail()
    public readonly email: string;
}