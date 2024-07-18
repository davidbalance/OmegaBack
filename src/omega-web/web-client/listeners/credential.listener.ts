import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { WebClientRepository } from "../web-client.repository";
import { CredentialCreateEvent, CredentialEvent } from "@/shared/events";

@Injectable()
export class CredentialListener {
    constructor(
        @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    ) { }

    @OnEvent(CredentialEvent.CREATE)
    async createWebClient({ id }: CredentialCreateEvent): Promise<void> {
        await this.repository.create({ user: id });
    }
}