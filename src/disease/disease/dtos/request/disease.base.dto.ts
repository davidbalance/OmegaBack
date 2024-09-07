import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class DiseaseRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly name: string;
    @IsNumber()
    public readonly group: number;
}