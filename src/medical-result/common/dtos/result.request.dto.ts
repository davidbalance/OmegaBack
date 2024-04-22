import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class InsertMedicalReportRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}

export class FindOneResultAndUpdateDiseaseRequestDTO {
    @IsNumber()
    public readonly diseaseId: number;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseName: string;
}