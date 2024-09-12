import { Expose } from "class-transformer";
import { MedicalOrder } from "./medical-order.base.dto";

export class MedicalOrderDoctor extends MedicalOrder {
    @Expose() public readonly leftReports: number;
}