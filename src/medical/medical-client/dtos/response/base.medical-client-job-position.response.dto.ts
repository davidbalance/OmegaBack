import { Expose } from "class-transformer";

export class MedicalClientJobPositionResponseDto {
    @Expose() public readonly jobPositionName: string;
}