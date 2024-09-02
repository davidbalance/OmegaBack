import { Expose } from "class-transformer";

export class PostPatientPagesResponseDto {
    @Expose() public readonly pages: number;
}