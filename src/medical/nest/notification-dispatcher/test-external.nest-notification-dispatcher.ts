import { Injectable, Provider } from "@nestjs/common";
import { TestExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/test-external.notification-dispatcher";
import { TestExternalNotificationDispatcherToken } from "../inject/notification-dispatcher.inject";

@Injectable()
export class TestExternalNestNotificationDispatcher implements TestExternalNotificationDispatcher {
    async emitAsync(payload: { owner: string; testKey: string; examName: string; examSubtype: string; examType: string; orderId: string; examTypeKey?: string; examSubtypeKey?: string; examKey?: string; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export const TestExternalNotificationDispatcherProvider: Provider = {
    provide: TestExternalNotificationDispatcherToken,
    useClass: TestExternalNestNotificationDispatcher
}