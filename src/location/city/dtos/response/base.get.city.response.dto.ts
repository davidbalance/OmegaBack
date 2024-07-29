import { Expose } from "class-transformer";

export class CityResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}