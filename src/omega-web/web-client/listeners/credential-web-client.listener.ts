import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { WebClientRepository } from "../repositories/web-client.repository";
import { CredentialEvent, OnCredentialCreateEvent } from "@/shared/events/credential.event";

@Injectable()
export class CredentialWebClientListener {
    constructor(
        @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    ) { }

    @OnEvent(CredentialEvent.ON_CREATE)
    async onCreate({ id }: OnCredentialCreateEvent): Promise<void> {
        await this.repository.create({ user: id });
    }
}