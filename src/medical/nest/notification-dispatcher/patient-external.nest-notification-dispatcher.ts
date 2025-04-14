import { Inject, Injectable, Provider } from "@nestjs/common";
import { PatientExternalCreatedEventPayload, PatientExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/patient-external.notification-dispatcher";
import { PatientExternalNotificationDispatcherToken } from "../inject/notification-dispatcher.inject";
import { EventEmitter2 } from "@nestjs/event-emitter";

@Injectable()
export class PatientExternalNestNotificationDispatcher implements PatientExternalNotificationDispatcher {
    constructor(
        @Inject(EventEmitter2) protected readonly eventEmitter: EventEmitter2
    ) { }

    async emitAsync(payload: PatientExternalCreatedEventPayload): Promise<void> {

    }
}

export const PatientExternalNotificationDispatcherProvider: Provider = {
    provide: PatientExternalNotificationDispatcherToken,
    useClass: PatientExternalNestNotificationDispatcher
}