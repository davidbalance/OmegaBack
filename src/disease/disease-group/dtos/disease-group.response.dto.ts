import { Expose, Type } from "class-transformer";

class DiseaseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: number;
}

export class GETDiseaseGroupResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => DiseaseDto)
    @Expose()
    public readonly diseases: DiseaseDto[]
}

export class GETDiseaseGroupArrayResponseDto {
    @Type(() => GETDiseaseGroupResponseDto)
    @Expose()
    public readonly groups: GETDiseaseGroupResponseDto[];
}

export class POSTDiseaseGroupResponseDto extends GETDiseaseGroupResponseDto { }

export class PATCHDiseaseGroupResponseDto { }

export class DELETEDiseaseGroupResponseDto { }