import { IsNotEmpty, IsString } from "class-validator";

export class MedicalResultRequestDto {
    @IsString()
    @IsNotEmpty()
    public readonly examType: string;

    @IsString()
    @IsNotEmpty()
    public readonly examSubtype: string;

    @IsString()
    @IsNotEmpty()
    public readonly examName: string;
}