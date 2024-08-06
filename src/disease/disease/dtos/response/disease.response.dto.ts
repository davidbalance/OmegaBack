import { Expose, Type } from "class-transformer";

export class DiseaseResponseDto {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;
}