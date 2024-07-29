import { Expose } from "class-transformer";

export class JobPositionResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}