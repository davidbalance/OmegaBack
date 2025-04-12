import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class MedicalResultDiseaseRequestDto {
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

    @IsString()
    @IsNotEmpty()
    public readonly diseaseCommentary: string;
}