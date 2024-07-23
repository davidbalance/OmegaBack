import { Expose, Type } from "class-transformer";
import { MedicalOrderCloudFileResponseDto } from "./base.medical-order-cloud-file.response.dto";

export class MedicalOrderCloudResponseDto {
    @Expose() public readonly dni: string;

    @Expose() public readonly fullname: string;

    @Type(() => MedicalOrderCloudFileResponseDto)
    @Expose() public readonly fileResults: MedicalOrderCloudFileResponseDto[];

    @Type(() => MedicalOrderCloudFileResponseDto)
    @Expose() public readonly fileReports: MedicalOrderCloudFileResponseDto[];
}