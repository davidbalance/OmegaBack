import { Expose } from "class-transformer";

export class LogoResponseDto {
    @Expose() public readonly logoId: string;
    @Expose() public readonly logoName: string;
}