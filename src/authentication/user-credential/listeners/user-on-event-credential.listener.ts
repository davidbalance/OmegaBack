import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { OnUserRemoveEvent, OnUserUpdateEvent, UserEvent } from "@/shared/events/user.event";
import { UserCredentialService } from "../services/user-credential.service";

@Injectable()
export class UserOnEventCredentialListener {
    constructor(
        @Inject(UserCredentialService) private readonly service: UserCredentialService
    ) { }

    @OnEvent(UserEvent.ON_UPDATE)
    async findOneCredentialAndUpdateUsername({ id, email }: OnUserUpdateEvent): Promise<void> {
        await this.service.updateEmailByUser(id, email);
    }

    @OnEvent(UserEvent.ON_REMOVE)
    async findOneCredentialAndDelete({ id }: OnUserRemoveEvent): Promise<void> {
        await this.service.deleteOneByUser(id);
    }
}