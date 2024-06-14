import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class POSTMedicalReportRequestDTO {
    @IsString()
    @IsNotEmpty()
    public readonly content: string;
}

export class PATCHMedicalResultWithDiseaseRequestDTO {
    @IsNumber()
    public readonly diseaseId: number;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseName: string;

    @IsNumber()
    public readonly diseaseGroupId: number;

    @IsString()
    @IsNotEmpty()
    public readonly diseaseGroupName: string;
}