import { Expose, Type } from "class-transformer";

class OrderResultReportDTO {
    @Expose()
    public readonly id: number;
}

class OrderResultDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly examName: string;

    @Expose()
    public readonly diseaseId?: number;

    @Expose()
    public readonly diseaseName?: string;

    @Expose()
    public readonly diseaseGroupId?: number;

    @Expose()
    public readonly diseaseGroupName?: string;

    @Type(() => OrderResultReportDTO)
    @Expose()
    public readonly report: OrderResultReportDTO;
}

export class FindOrderResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly patientDni: string;

    @Expose()
    public readonly patientFullname: string;

    @Expose()
    public readonly process: string;

    @Expose()
    public readonly createAt: Date;

    @Expose()
    public readonly mailStatus?: boolean;

    @Type(() => OrderResultDTO)
    @Expose()
    public readonly results: OrderResultDTO[]
}

export class FindOrdersResponseDTO {
    @Type(() => FindOrderResponseDTO)
    @Expose()
    public readonly orders: FindOrderResponseDTO[]
}

class FileDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly examName: string;
    @Expose()
    public readonly type: 'result' | 'report';
}

export class FindOrderFilesResponseDTO {
    @Expose()
    public readonly dni: string;
    @Expose()
    public readonly fullname: string;
    @Expose()
    public readonly email: string;
    @Type(() => FileDto)
    @Expose()
    public readonly fileResults: FileDto[];
    @Type(() => FileDto)
    @Expose()
    public readonly fileReports: FileDto[];
}