import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class MedicalReportRequestDto {
    @IsNumber()
    public readonly medicalResult: number;

    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}