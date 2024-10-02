import { Expose } from "class-transformer";

export class MedicalResultFileCheckCount {
    @Expose() public readonly total: number
    @Expose() public readonly match: number
    @Expose() public readonly error: number
}