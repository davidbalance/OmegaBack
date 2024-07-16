import { CredentialEvent, CredentialCreateEvent, CredentialRemoveEvent } from "@/shared";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserManagementService } from "../services/user-management.service";

@Injectable()
export class CredentialUserListener {

    constructor(
        @Inject(UserManagementService) private readonly service: UserManagementService,
    ) { }

    @OnEvent(CredentialEvent.CREATE)
    async assignCredential({ id }: CredentialCreateEvent): Promise<void> {
        await this.service.updateOne(id, { hasCredential: true });
    }

    @OnEvent(CredentialEvent.REMOVE)
    async removeCredential({ id }: CredentialRemoveEvent): Promise<void> {
        await this.service.updateOne(id, { hasCredential: false });
    }
}