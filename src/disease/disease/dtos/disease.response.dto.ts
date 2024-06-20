import { Expose, Type } from "class-transformer";

export class GETDiseaseResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
}

export class GETDiseaseArrayResponseDto {
    @Type(() => GETDiseaseResponseDto)
    @Expose()
    public readonly diseases: GETDiseaseResponseDto[]
}

export class POSTDiseaseResponseDto extends GETDiseaseResponseDto { }

export class PATCHDiseaseResponseDto extends GETDiseaseResponseDto { }

export class DELETEDiseaseResponseDto { }
