import { CredentialEvent, OnCredentialCreateEvent, OnCredentialRemoveEvent } from "@/shared/events/credential.event";
import { Inject, Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class UserCredentialEventService {
    constructor(
        @Inject(EventEmitter2) private readonly eventEmitter: EventEmitter2
    ) { }

    emitCredentialCreateEvent(user: number) {
        this.eventEmitter.emit(CredentialEvent.ON_CREATE, new OnCredentialCreateEvent(user));
    }

    emitCredentialRemoveEvent(user: number) {
        this.eventEmitter.emit(CredentialEvent.ON_REMOVE, new OnCredentialRemoveEvent(user));
    }
}