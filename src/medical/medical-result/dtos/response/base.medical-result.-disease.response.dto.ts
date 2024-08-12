import { Expose } from "class-transformer";

export class MedicalResultDiseaseResponse {
    @Expose() public readonly id: number;
    @Expose() public readonly diseaseId: number;
    @Expose() public readonly diseaseName: string;
    @Expose() public readonly diseaseGroupId: number;
    @Expose() public readonly diseaseGroupName: string;
    @Expose() public readonly diseaseCommentary: string;
}