import { Expose, Type } from "class-transformer";

export class GETMedicalEmailResponseDto {
    @Expose()
    public readonly id: number;
    @Expose()
    public readonly email: string;
    @Expose()
    public readonly default: boolean;
}

export class GETMedicalEmailArrayResponseDto {
    @Type(() => GETMedicalEmailResponseDto)
    @Expose()
    public readonly email: GETMedicalEmailResponseDto[];
}

export class POSTMedicalEmailResponseDTO extends GETMedicalEmailResponseDto { }

export class PATCHMedicalEmailResponseDTO extends GETMedicalEmailResponseDto { }

export class DELETEMedicalEmailResponseDTO { }