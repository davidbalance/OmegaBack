import { IsNotEmpty, IsString } from "class-validator";

export class PostExamTypeRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}