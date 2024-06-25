import { GETMedicalReportResponseDto } from "@/medical/medical-report/dtos/medical-report.response.dto";
import { Expose, Type } from "class-transformer";

export class GETMedicalResultResponseDto {

    @Expose()
    public readonly id: number;

    @Expose()
    public readonly examName: string;

    @Expose()
    public readonly diseaseId: string;

    @Expose()
    public readonly diseaseName: string;

    @Expose()
    public readonly diseaseGroupId: string;

    @Expose()
    public readonly diseaseGroupName: string;

    @Expose()
    public readonly hasFile: boolean;

    @Type(() => GETMedicalReportResponseDto)
    @Expose()
    public readonly report?: GETMedicalReportResponseDto
}

export class GETMedicalResultArrayResponseDto {
    @Type(() => GETMedicalResultResponseDto)
    @Expose()
    public readonly results: GETMedicalResultResponseDto[]
}

export class POSTMedicalResultFileResponseDto extends GETMedicalResultResponseDto { }

export class PATCHMedicalResultResponseDto { }

export class PATCHMedicalResultFileResponseDto { }
