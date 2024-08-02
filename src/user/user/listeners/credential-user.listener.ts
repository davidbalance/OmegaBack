import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserManagementService } from "../services/user-management.service";
import { CredentialEvent, OnCredentialCreateEvent, OnCredentialRemoveEvent } from "@/shared/events/credential.event";

@Injectable()
export class CredentialUserListener {

    constructor(
        @Inject(UserManagementService) private readonly service: UserManagementService,
    ) { }

    @OnEvent(CredentialEvent.ON_CREATE)
    async onCreate({ id }: OnCredentialCreateEvent): Promise<void> {
        await this.service.updateOne(id, { hasCredential: true });
    }

    @OnEvent(CredentialEvent.ON_REMOVE)
    async removeCredential({ id }: OnCredentialRemoveEvent): Promise<void> {
        await this.service.updateOne(id, { hasCredential: false });
    }
}