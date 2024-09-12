import { Expose } from "class-transformer";

export class Exam {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly subtype: number;
}