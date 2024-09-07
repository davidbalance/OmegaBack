import { Expose } from "class-transformer";

export class MedicalClientManagementArea {
    @Expose() public readonly managementId?: number;
    @Expose() public readonly managementName?: string;
    @Expose() public readonly areaId?: number;
    @Expose() public readonly areaName?: string;
}