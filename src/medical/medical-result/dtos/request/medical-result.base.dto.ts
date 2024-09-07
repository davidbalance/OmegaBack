import { IsInt, IsNotEmpty, IsString } from "class-validator";

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

    @IsString()
    @IsNotEmpty()
    public readonly doctorDni: string;

    @IsString()
    @IsNotEmpty()
    public readonly doctorFullname: string;

    @IsInt()
    public readonly order: number;
}