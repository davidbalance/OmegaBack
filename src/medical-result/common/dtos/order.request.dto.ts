import { IsNumber } from "class-validator";

export class SendMailRequestDto {
    @IsNumber()
    public readonly id: number;
}