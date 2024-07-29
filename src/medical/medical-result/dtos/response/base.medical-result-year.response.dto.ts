import { Expose } from "class-transformer";

export class MedicalResultYearResponseDto {
    @Expose() public readonly year: number;
}