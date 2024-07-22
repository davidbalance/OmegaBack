import { DiseaseResponseDto } from "@/disease/disease/dtos/response/disease.response.dto";
import { Expose, Type } from "class-transformer";

export class DiseaseGroupResponseDto {
    @Expose() public readonly id: number;

    @Expose() public readonly name: string;

    @Type(() => DiseaseResponseDto)
    @Expose() public readonly diseases: DiseaseResponseDto[]
}