import { Expose } from "class-transformer";

export class MedicalResult {
    @Expose() public readonly id: number;
    @Expose() public readonly examType: string;
    @Expose() public readonly examSubtype: string;
    @Expose() public readonly examName: string;
    @Expose() public readonly hasFile: boolean;

    @Expose() public readonly diseases: string[];
}