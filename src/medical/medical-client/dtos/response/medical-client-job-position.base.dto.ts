import { Expose } from "class-transformer";

export class MedicalClientJobPosition {
    @Expose() jobPositionName: string;
}