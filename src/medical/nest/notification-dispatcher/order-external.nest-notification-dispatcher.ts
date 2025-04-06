import { Injectable, Provider } from "@nestjs/common";
import { OrderExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/order-external.notification-dispatcher";
import { OrderExternalNotificationDispatcherToken } from "../inject/notification-dispatcher.inject";

@Injectable()
export class OrderExternalNestNotificationDispatcher implements OrderExternalNotificationDispatcher {
    constructor() { }

    async emitAsync(payload: { owner: string; patientDni: string; corporativeName: string; companyRuc: string; companyName: string; branchName: string; doctorDni: string; doctorFullname: string; orderKey: string; orderProcess: string; orderYear: number; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export const OrderExternalNotificationDispatcherProvider: Provider = {
    provide: OrderExternalNotificationDispatcherToken,
    useClass: OrderExternalNestNotificationDispatcher
}