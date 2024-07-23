import { Expose } from "class-transformer";

export class ExamSubtypeResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}