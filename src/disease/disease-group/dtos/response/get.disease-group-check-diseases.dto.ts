import { Expose } from "class-transformer";

export class GetDiseaseGroupCheckDiseaseResponseDto {
    @Expose() public readonly hasDiseases: boolean;
}