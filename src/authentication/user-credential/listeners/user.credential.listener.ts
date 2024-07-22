import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { UserEvent, UserUpdateEvent, UserRemoveEvent } from "@/shared/events";
import { UserCredentialRepository } from "../repositories/user-credential.repository";

@Injectable()
export class UserCredentialListener {
    constructor(
        @Inject(UserCredentialRepository) private readonly repository: UserCredentialRepository
    ) { }

    @OnEvent(UserEvent.UPDATE)
    async findOneCredentialAndUpdateUsername({ updateEvent }: UserUpdateEvent): Promise<void> {
        const { id, email } = updateEvent;
        const credential = await this.repository.findOne({ where: { user: id }, select: { email: true } });
        if (credential.email !== email) {
            await this.repository.findOneAndUpdate({ id }, { email: email });
        }
    }

    @OnEvent(UserEvent.REMOVE)
    async findOneCredentialAndDelete({ removeEvent }: UserRemoveEvent): Promise<void> {
        const { id } = removeEvent;
        await this.repository.findOneAndDelete({ user: id });
    }
}