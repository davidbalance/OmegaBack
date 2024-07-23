import { Expose } from "class-transformer";

export class MedicalClientManagementAreaResponseDto {
    @Expose() public readonly managementId?: number;
    @Expose() public readonly managementName?: string;
    @Expose() public readonly areaId?: number;
    @Expose() public readonly areaName?: string;
}