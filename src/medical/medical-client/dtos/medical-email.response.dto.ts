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

export class POSTMedicalEmailResponseDto extends GETMedicalEmailResponseDto { }

export class PATCHMedicalEmailResponseDto extends GETMedicalEmailResponseDto { }

export class DELETEMedicalEmailResponseDto { }