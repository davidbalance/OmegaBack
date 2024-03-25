import { WebClient } from "../entities/web-client.entity";

export class CreateWebClientResponseDTO {
    public readonly user: number;
}

export class UpdateWebClientRoutesResponseDTO {
    public readonly routes: number[];
}

export class FindWebClientConfiguration {
    public readonly client: WebClient;
}