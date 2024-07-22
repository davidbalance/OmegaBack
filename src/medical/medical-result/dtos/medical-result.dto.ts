import { MedicalReportResponseDto } from "@/medical/medical-report/dtos/response/base.medical-report.response.dto";
import { Expose, Type } from "class-transformer";
import { IsNumber, IsString, IsNotEmpty } from "class-validator";

export class MedicalResultDiseaseResponse {
    @Expose() public readonly id: number;

    @Expose() public readonly diseaseId: string;

    @Expose() public readonly diseaseName: string;

    @Expose() public readonly diseaseGroupId: string;

    @Expose() public readonly diseaseGroupName: string;

    @Expose() public readonly diseaseCommentary: string;
}

export class MedicalResultReponse {
    @Expose() public readonly id: number;

    @Expose() public readonly examName: string;

    @Expose() public readonly hasFile: boolean;

    @Type(() => MedicalResultDiseaseResponse)
    @Expose() public diseases: MedicalResultDiseaseResponse[]

    @Type(() => MedicalReportResponseDto)
    @Expose() public readonly report?: MedicalReportResponseDto
}

export class MedicalResultDiseaseRequest {
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