import { IsNotEmpty, IsString } from "class-validator";

export class PATCHMedicalReportRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}