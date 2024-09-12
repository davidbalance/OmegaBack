import { Expose } from "class-transformer";

export class ExamSubtype {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly type: number;
}