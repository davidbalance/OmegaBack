import { Inject, Injectable } from "@nestjs/common";
import { CredentialCreateEvent, CredentialEvent } from "@/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebClientRepository } from "../web-client.repository";

@Injectable()
export class CredentialListener {
    constructor(
        @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    ) { }

    @OnEvent(CredentialEvent.CREATE)
    async createWebClient({ createEvent }: CredentialCreateEvent): Promise<void> {
        const { id } = createEvent;
        await this.repository.create({ user: id });
    }
}