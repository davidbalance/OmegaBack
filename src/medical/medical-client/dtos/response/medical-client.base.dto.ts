import { Expose } from "class-transformer";

export class MedicalClient {
    @Expose() public readonly id: number;
    @Expose() public readonly dni: string;
    @Expose() public readonly name: string;
    @Expose() public readonly lastname: string;
    @Expose() public readonly createAt: Date;
}