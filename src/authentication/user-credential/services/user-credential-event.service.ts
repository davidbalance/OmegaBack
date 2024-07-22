import { CredentialCreateEvent, CredentialEvent } from "@/shared/events";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UserCredentialEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitCredentialCreateEvent(user: number) {
        this.eventEmitter.emit(CredentialEvent.CREATE, new CredentialCreateEvent(user));
    }
}