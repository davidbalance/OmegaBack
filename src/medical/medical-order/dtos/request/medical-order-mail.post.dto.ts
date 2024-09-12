import { IsNumber } from "class-validator";

export class PostMedicalOrderMailRequestDto {
    @IsNumber()
    public readonly order: number;
    
    @IsNumber()
    public readonly mail: number;
}