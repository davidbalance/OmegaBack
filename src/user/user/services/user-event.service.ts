import { UserEvent, UserRemoveEvent, UserUpdateEvent } from "@/shared";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UserEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitUserUpdateEvent(id: number, email: string): void {
        this.eventEmitter.emit(UserEvent.UPDATE, new UserUpdateEvent({ id, email }));
    }

    emitUserDeleteEvent(id: number): void {
        this.eventEmitter.emit(UserEvent.REMOVE, new UserRemoveEvent({ id }));
    }
}