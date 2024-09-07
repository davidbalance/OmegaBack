import { Expose } from "class-transformer";

export class MedicalReport {
    @Expose() public readonly id: number;
    @Expose() public readonly content: string;
    @Expose() public readonly hasFile: boolean;
}