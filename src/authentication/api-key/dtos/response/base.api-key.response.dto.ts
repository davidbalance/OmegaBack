import { Expose, Type } from "class-transformer";

export class ApiKeyResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}