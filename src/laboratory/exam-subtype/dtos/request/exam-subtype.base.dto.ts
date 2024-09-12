import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ExamSubtypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsNumber()
    public readonly type: number;
}