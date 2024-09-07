import { Expose } from "class-transformer";

export class MedicalEmail {
    @Expose() public readonly id: number;
    @Expose() public readonly email: string;
    @Expose() public readonly default: boolean;
}