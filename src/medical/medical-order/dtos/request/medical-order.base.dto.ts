import { IsString, IsNotEmpty } from "class-validator";

export class MedicalOrderRequestDto {

    @IsString()
    @IsNotEmpty()
    public readonly corporativeName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyName: string;

    @IsString()
    @IsNotEmpty()
    public readonly companyRuc: string;

    @IsString()
    @IsNotEmpty()
    public readonly branchName: string;

    @IsString()
    @IsNotEmpty()
    public readonly patientDni: string;

    @IsString()
    @IsNotEmpty()
    public readonly process: string;
}
