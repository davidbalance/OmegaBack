import { Expose } from "class-transformer";

export class ExamSubtypeResponse {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}