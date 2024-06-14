import { Expose, Type } from "class-transformer";

export class GETDiseaseResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
}

export class POSTDiseaseResponseDTO extends GETDiseaseResponseDTO { }

export class PATCHDiseaseResponseDTO extends GETDiseaseResponseDTO { }

export class GETDiseaseArrayResponseDTO {
    @Type(() => GETDiseaseResponseDTO)
    @Expose()
    public readonly diseases: GETDiseaseResponseDTO[]
}

export class DELETEDiseaseResponseDTO { }
