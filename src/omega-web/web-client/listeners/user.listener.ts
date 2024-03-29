import { Inject, Injectable } from "@nestjs/common";
import { WebClient } from "../entities/web-client.entity";
import { UserCreateEvent, UserEvent } from "@/shared";
import { OnEvent } from "@nestjs/event-emitter";
import { WebClientRepository } from "../web-client.repository";

@Injectable()
export class UserListener {
    constructor(
        @Inject(WebClientRepository) private readonly repository: WebClientRepository,
    ) { }

    @OnEvent(UserEvent.CREATE)
    async createWebClient({ createEvent }: UserCreateEvent): Promise<void> {
        const { id } = createEvent;
        await this.repository.create({ user: id });
    }
}