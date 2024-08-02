import { Expose } from "class-transformer";

export class PostWebClientCreateResponseDto {
    @Expose() public readonly user: number;
}