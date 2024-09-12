import { Expose } from "class-transformer";

export class Branch {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
    @Expose() public readonly city: string;
}