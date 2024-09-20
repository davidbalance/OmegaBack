import { Expose, Type } from "class-transformer";
import { MedicalOrderCloudFile } from "./medical-order-cloud-file.base.dto";

export class MedicalOrderCloud {
    @Expose() public readonly dni: string;
    @Expose() public readonly fullname: string;
    @Expose() public readonly hasFile: boolean;

    @Type(() => MedicalOrderCloudFile)
    @Expose() public readonly fileResults: MedicalOrderCloudFile[];

    @Type(() => MedicalOrderCloudFile)
    @Expose() public readonly fileReports: MedicalOrderCloudFile[];
}