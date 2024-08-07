import { Expose } from "class-transformer";

export class AreaResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}