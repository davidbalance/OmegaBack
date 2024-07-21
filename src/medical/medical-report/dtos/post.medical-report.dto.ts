import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class POSTMedicalReportRequestDto {
    @IsNumber()
    public readonly medicalResult: number;

    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}