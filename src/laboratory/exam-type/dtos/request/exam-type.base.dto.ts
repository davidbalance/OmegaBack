import { IsNotEmpty, IsString } from "class-validator";

export class ExamTypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}