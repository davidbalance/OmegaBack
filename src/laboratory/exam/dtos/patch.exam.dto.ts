import { IsNotEmpty, IsString } from "class-validator";

export class PATCHExamRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}