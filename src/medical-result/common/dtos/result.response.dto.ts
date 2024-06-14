import { Expose, Type } from "class-transformer";

class ResultReportDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly content: string;

    @Expose()
    public readonly hasFile: boolean;
}

class ResultOrderDTO {
    @Expose()
    public readonly patientFullname: string;
}

export class GETMedicalResultResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly examName: string;

    @Expose()
    public readonly diseaseId: number;

    @Expose()
    public readonly diseaseName: string;

    @Type(() => ResultOrderDTO)
    @Expose()
    public readonly order: ResultOrderDTO;

    @Type(() => ResultReportDTO)
    @Expose()
    public readonly report?: ResultReportDTO;
}

export class GETMedicalResultArrayResponseDTO {
    @Type(() => GETMedicalResultResponseDTO)
    @Expose()
    public readonly results: GETMedicalResultResponseDTO[]
}

export class PATCHMedicalResultResponseDTO { }
