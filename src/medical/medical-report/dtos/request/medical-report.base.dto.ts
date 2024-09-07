import { IsString, IsNotEmpty } from "class-validator";

export class MedicalReportRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}