import { Expose, Type } from "class-transformer";
import { MedicalOrder } from "./medical-order.base.dto";
import { ExternalMedicalResult } from "@/medical/medical-result/dtos/response/external-medical-result.base.dto";

export class ExternalMedicalOrder extends MedicalOrder {
    @Type(() => ExternalMedicalResult)
    @Expose() public readonly results: ExternalMedicalResult[]
}