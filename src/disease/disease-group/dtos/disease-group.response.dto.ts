import { Expose, Type } from "class-transformer";

class DiseaseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: number;
}

export class GETDiseaseGroupResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => DiseaseDTO)
    @Expose()
    public readonly diseases: DiseaseDTO[]
}

export class GETDiseaseGroupArrayResponseDTO {
    @Type(() => GETDiseaseGroupResponseDTO)
    @Expose()
    public readonly groups: GETDiseaseGroupResponseDTO[];
}

export class POSTDiseaseGroupResponseDTO extends GETDiseaseGroupResponseDTO { }

export class PATCHDiseaseGroupResponseDTO { }

export class DELETEDiseaseGroupResponseDTO { }