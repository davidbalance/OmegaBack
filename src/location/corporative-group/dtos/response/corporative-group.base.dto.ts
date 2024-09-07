import { Expose } from "class-transformer";

export class CorporativeGroup {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}