import { Expose } from "class-transformer";

export class ExamResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}