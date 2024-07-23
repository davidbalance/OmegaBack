import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostExamSubtypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;

    @IsNumber()
    public readonly type: number;
}