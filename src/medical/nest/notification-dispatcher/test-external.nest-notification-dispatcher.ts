import { Injectable, Provider } from "@nestjs/common";
import { TestExternalCreatedEventPayload, TestExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/test-external.notification-dispatcher";
import { medicalEvent, TestExternalNotificationDispatcherToken } from "../inject/notification-dispatcher.inject";
import { OrderExternalNestNotificationDispatcher } from "./order-external.nest-notification-dispatcher";

@Injectable()
export class TestExternalNestNotificationDispatcher
    extends OrderExternalNestNotificationDispatcher
    implements TestExternalNotificationDispatcher {

    async emitAsync(payload: TestExternalCreatedEventPayload): Promise<void> {
        super.emitAsync(payload);
        if (payload.examKey && payload.examSubtypeKey && payload.examTypeKey) {
            await this.eventEmitter.emitAsync(medicalEvent.testCreated, payload);
        }
    }
}

export const TestExternalNotificationDispatcherProvider: Provider = {
    provide: TestExternalNotificationDispatcherToken,
    useClass: TestExternalNestNotificationDispatcher
}