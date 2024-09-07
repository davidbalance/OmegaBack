import { Expose } from "class-transformer";

export class DiseaseGroup {
    @Expose() public readonly id: number;

    @Expose() public readonly name: string;
}