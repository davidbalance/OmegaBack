import { IsNotEmpty, IsString } from "class-validator";

export class POSTExamRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly key: string;

    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}


export class PATCHExamRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
}