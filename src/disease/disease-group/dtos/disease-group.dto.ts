import { DiseaseDto } from "@/disease/disease/dtos/disease.response.dto";
import { Expose, Type } from "class-transformer";

export class DiseaseGroupResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Type(() => DiseaseDto)
    @Expose()
    public readonly diseases: DiseaseDto[]
}