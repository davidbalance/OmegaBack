import { Expose } from "class-transformer";

export class ExamTypeResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}