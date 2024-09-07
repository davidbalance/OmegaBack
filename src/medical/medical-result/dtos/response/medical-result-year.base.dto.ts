import { Expose } from "class-transformer";

export class MedicalResultYear {
    @Expose() public readonly year: number;
}