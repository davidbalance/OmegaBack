import { Expose } from "class-transformer";

export class GetWebClientLogoResponseDto {
    @Expose() public readonly logo: string;
}