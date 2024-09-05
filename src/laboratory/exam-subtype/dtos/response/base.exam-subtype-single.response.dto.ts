import { Expose } from "class-transformer";

export class ExamSubtypeSingleResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}