import { IsNotEmpty, IsString } from "class-validator";

export class POSTExamRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}


export class PATCHExamRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}