import { Expose, Type } from "class-transformer";

export class ExamType {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}