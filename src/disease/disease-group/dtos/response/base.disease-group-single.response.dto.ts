import { Expose } from "class-transformer";

export class DiseaseGroupSingleResponseDto {
    @Expose() public readonly id: number;

    @Expose() public readonly name: string;
}