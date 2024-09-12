import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ExamRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsNumber()
    public readonly subtype: number;
}