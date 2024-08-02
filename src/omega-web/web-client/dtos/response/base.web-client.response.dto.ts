import { Expose, Type } from "class-transformer";

class WebClientLogo {
    @Expose() public readonly name: string;
}

class WebClientResource {
    @Expose() public readonly icon?: string;
    @Expose() public readonly label: string;
    @Expose() public readonly address: string;
}

export class WebClientResponseDto {
    @Type(() => WebClientLogo)
    @Expose() public readonly logo: WebClientLogo;

    @Type(() => WebClientResource)
    @Expose() public readonly resources: WebClientResource[];
}