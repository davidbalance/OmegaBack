import { Expose } from "class-transformer";

export class HasValueResponseDto {
    @Expose() public readonly hasValue: boolean;
}