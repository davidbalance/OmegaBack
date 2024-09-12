import { Expose } from "class-transformer";

export class PostSessionResponseDto {
    @Expose() public readonly session: string;
}