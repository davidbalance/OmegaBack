import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostDiseaseRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    @IsNumber()
    public readonly group: number;
}