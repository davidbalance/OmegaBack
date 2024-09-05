import { Expose } from "class-transformer";

export class CorporativeGroupSingleResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}