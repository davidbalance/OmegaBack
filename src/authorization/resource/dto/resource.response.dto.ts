import { Expose, Type } from "class-transformer";

export class FindResourceResponseDTO {
    @Expose()
    public readonly id: number;

    @Expose()
    public readonly name: string;

    @Expose()
    public readonly claim: string;
}

export class FindResourcesResponseDTO {
    @Type(() => FindResourceResponseDTO)
    @Expose()
    public readonly resources: FindResourceResponseDTO[];
}