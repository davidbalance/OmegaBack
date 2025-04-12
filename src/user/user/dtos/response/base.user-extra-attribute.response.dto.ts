import { Expose } from "class-transformer";

export class UserAttributeResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly value: string;
}