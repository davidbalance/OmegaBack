import { GETMedicalClientResponseDto } from "@/medical/medical-client/dtos/medical-client.response.dto";
import { GETMedicalResultResponseDto } from "@/medical/medical-result/dtos/medical-result.response.dto";
import { Expose, Type } from "class-transformer";

export class GETMedicalOrderResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly process: string;

    @Expose()
    public readonly createAt: Date;

    @Expose()
    public readonly mailStatus?: boolean;

    @Expose()
    public readonly orderStatus: string;

    @Type(() => GETMedicalClientResponseDto)
    @Expose()
    public readonly client: GETMedicalClientResponseDto;

    @Type(() => GETMedicalResultResponseDto)
    @Expose()
    public readonly results: GETMedicalResultResponseDto[]
}

export class GETMedicalOrderArrayResponseDto {
    @Type(() => GETMedicalOrderResponseDto)
    @Expose()
    public readonly orders: GETMedicalOrderResponseDto[]
}

export class GETMedicalOrderArrayWithPageCountResponseDto extends GETMedicalOrderArrayResponseDto {
    @Expose()
    public readonly pages: number;
}

class FileDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly examName: string;
    @Expose()
    public readonly type: 'result' | 'report';
}

export class GETMedicalOrderFilesResponseDto {
    @Expose()
    public readonly dni: string;
    @Expose()
    public readonly fullname: string;
    @Type(() => FileDto)
    @Expose()
    public readonly fileResults: FileDto[];
    @Type(() => FileDto)
    @Expose()
    public readonly fileReports: FileDto[];
}


export class PlainMedicalOrder {

    @Expose()
    public readonly id: number;

    @Expose()
    public readonly process: string;

    @Expose()
    public readonly createAt: Date;

    @Expose()
    public readonly mailStatus?: boolean;

    @Expose()
    public readonly orderStatus: string;

    @Expose()
    public readonly dni: string;

    @Expose()
    public readonly fullname: string;

    @Type(() => GETMedicalResultResponseDto)
    @Expose()
    public readonly results: GETMedicalResultResponseDto[]
}

export class GETPlainMedicalOrderResponseDto extends PlainMedicalOrder { }

export class GETPlainMedicalOrderArrayResponseDto {
    @Type(() => GETPlainMedicalOrderResponseDto)
    @Expose()
    public readonly orders: GETPlainMedicalOrderResponseDto[];
}

export class GETPlainMedicalOrderArrayWithPageCountResponseDto extends GETPlainMedicalOrderArrayResponseDto {
    @Expose()
    public readonly pages: number;
}