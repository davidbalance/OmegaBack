import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { CredentialCreateEvent, CredentialEvent } from "@/shared/events";
import { WebClientRepository } from "../repositories/web-client.repository";

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