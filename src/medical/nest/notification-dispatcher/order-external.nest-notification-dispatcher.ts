import { Injectable, Provider } from "@nestjs/common";
import { OrderExternalCreatedEventPayload, OrderExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/order-external.notification-dispatcher";
import { medicalEvent, OrderExternalNotificationDispatcherToken } from "../inject/notification-dispatcher.inject";
import { PatientExternalNestNotificationDispatcher } from "./patient-external.nest-notification-dispatcher";

@Injectable()
export class OrderExternalNestNotificationDispatcher
    extends PatientExternalNestNotificationDispatcher
    implements OrderExternalNotificationDispatcher {

    async emitAsync(payload: OrderExternalCreatedEventPayload): Promise<void> {
        super.emitAsync(payload);
        if (payload.branchKey && payload.companyKey && payload.corporativeKey) {
            await this.eventEmitter.emitAsync(medicalEvent.orderCreated, payload);
        }
    }
}

export const OrderExternalNotificationDispatcherProvider: Provider = {
    provide: OrderExternalNotificationDispatcherToken,
    useClass: OrderExternalNestNotificationDispatcher
}