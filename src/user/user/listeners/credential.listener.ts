import { CredentialEvent, CredentialCreateEvent, CredentialRemoveEvent } from "@/shared";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserRepository } from "../user.repository";

@Injectable()
export class CredentialListener {

    constructor(
        @Inject(UserRepository) private readonly repository: UserRepository,
    ) { }

    @OnEvent(CredentialEvent.CREATE)
    async assignCredential({ createEvent }: CredentialCreateEvent): Promise<void> {
        const { id } = createEvent;
        this.repository.findOneAndUpdate({ id }, { hasCredential: true });
    }

    @OnEvent(CredentialEvent.REMOVE)
    async removeCredential({ removeEvent }: CredentialRemoveEvent): Promise<void> {
        const { id } = removeEvent;
        this.repository.findOneAndUpdate({ id }, { hasCredential: false });
    }
}