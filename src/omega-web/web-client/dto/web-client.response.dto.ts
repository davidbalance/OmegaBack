import { Expose, Type } from "class-transformer";

export class CreateWebClientResponseDto {
    @Expose()
    public readonly user: number;
}

export class UpdateWebClientRoutesResponseDto {
    @Expose()
    public readonly routes: number[];
}

class WebClientLogo {
    @Expose()
    public readonly name: string;
}

class WebClientResource {
    @Expose()
    public readonly icon?: string;

    @Expose()
    public readonly label: string;

    @Expose()
    public readonly address: string;
}

export class FindWebClientResponseDto {
    @Type(() => WebClientLogo)
    @Expose()
    public readonly logo: WebClientLogo;

    @Type(() => WebClientResource)
    @Expose()
    public readonly resources: WebClientResource[];
}

export class UpdateWebClientWebLogoResponseDto {}
export class UpdateWebClientWebResourceResponseDto {}