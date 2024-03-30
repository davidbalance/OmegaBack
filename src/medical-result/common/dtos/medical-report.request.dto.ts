import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateMedicalReportRequestDTO {

    @IsString()
    @IsNotEmpty()
    public readonly content: string;

    @IsNumber()
    public readonly order: number;

    @IsString()
    @IsNotEmpty()
    public readonly patientFullname: string;

    @IsNumber()
    public readonly patientAge: number;
    
    @IsString()
    @IsNotEmpty()
    public readonly patientDni: string;
    
    @IsString()
    @IsNotEmpty()
    public readonly examName: string;
    
    @IsString()
    @IsNotEmpty()
    public readonly companyName: string;
    
    @IsString()
    @IsNotEmpty()
    public readonly doctorDni: string;
    
    @IsString()
    @IsNotEmpty()
    public readonly doctorFullname: string;
    
    @IsString()
    @IsNotEmpty()
    public readonly doctorSignature: string;
}