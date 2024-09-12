import { Expose } from "class-transformer";

export class UserAttribute {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly value: string;
}