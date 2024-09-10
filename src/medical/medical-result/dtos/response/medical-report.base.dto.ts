import { Expose } from "class-transformer";

export class MedicalResultReport {
    @Expose() public readonly content: string;
}