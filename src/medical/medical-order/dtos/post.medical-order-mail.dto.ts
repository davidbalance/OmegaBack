import { IsNumber } from "class-validator";

export class POSTMedicalOrderMailRequestDto {
    @IsNumber()
    public readonly order: number;
    @IsNumber()
    public readonly mail: number;
}