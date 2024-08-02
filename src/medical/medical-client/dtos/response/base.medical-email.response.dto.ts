import { Expose } from "class-transformer";

export class MedicalEmailResponseDto {
    @Expose() public readonly id: number;
    @Expose() public readonly email: string;
    @Expose() public readonly default: boolean;
}