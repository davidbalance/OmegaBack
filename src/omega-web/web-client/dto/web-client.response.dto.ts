import { WebClient } from "../entities/web-client.entity";

export class CreateWebClientResponseDTO {
    public readonly user: number;
}

export class UpdateWebClientRoutesResponseDTO {
    public readonly routes: number[];
}

export class FindWebClient {
    public readonly logo: { address: string };
    public readonly resources: { icon?: string; label: string; address: string; }[];
}

export class FindOneWebClientResponseDTO {
    public readonly client: FindWebClient;
}