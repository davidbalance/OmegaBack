import { Expose } from "class-transformer";

export class MedicalOrderFlatResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly lastname: string;
    @Expose() public readonly dni: string;
    @Expose() public readonly mailStatus?: boolean;
    @Expose() public readonly orderStatus: string;
    @Expose() public readonly companyRuc: string;
    @Expose() public readonly companyName: string;
    @Expose() public readonly process: string;
    @Expose() public readonly createAt: Date;

}