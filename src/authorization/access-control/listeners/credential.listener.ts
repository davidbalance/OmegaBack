import { Inject, Injectable } from "@nestjs/common";
import { AccessControlRepository } from "../access-control.repository";
import { OnEvent } from "@nestjs/event-emitter";
import { CredentialCreateEvent, CredentialEvent } from "@/shared";

@Injectable()
export class CredentialListener {
    constructor(
        @Inject(AccessControlRepository) private readonly repository: AccessControlRepository
    ) { }

    @OnEvent(CredentialEvent.CREATE)
    async createAccessControlClient({ createEvent }: CredentialCreateEvent) {
        const { id } = createEvent;
        await this.repository.create({ user: id });
    }
}