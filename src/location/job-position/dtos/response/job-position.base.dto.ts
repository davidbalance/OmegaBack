import { Expose } from "class-transformer";

export class JobPosition {
    @Expose() public readonly id: number;
    @Expose() public readonly name: string;
}