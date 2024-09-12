import { Expose } from "class-transformer";

export class Company {
    @Expose() public readonly id: number;
    @Expose() public readonly ruc: string;
    @Expose() public readonly name: string;
    @Expose() public readonly address: string;
    @Expose() public readonly phone: string;
}