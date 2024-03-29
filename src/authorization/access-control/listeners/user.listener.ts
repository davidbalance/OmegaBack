import { Inject, Injectable } from "@nestjs/common";
import { AccessControlRepository } from "../access-control.repository";
import { OnEvent } from "@nestjs/event-emitter";
import { UserCreateEvent, UserEvent } from "@/shared";

@Injectable()
export class UserListener {
    constructor(
        @Inject(AccessControlRepository) private readonly repository: AccessControlRepository
    ) { }

    @OnEvent(UserEvent.CREATE)
    async createAccessControlClient({ createEvent }: UserCreateEvent) {
        const { id } = createEvent;
        await this.repository.create({ user: id });
    }
}