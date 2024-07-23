import { IsNotEmpty, IsString } from "class-validator";

export class PostExamRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}