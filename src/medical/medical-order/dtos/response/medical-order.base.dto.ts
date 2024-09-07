import { Expose } from "class-transformer";

export class MedicalOrder {
    @Expose() public readonly id: number;
    @Expose() public readonly process: string;
    @Expose() public readonly createAt: Date;
    @Expose() public readonly mailStatus?: boolean;
    @Expose() public readonly orderStatus: string;
}