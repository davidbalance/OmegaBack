import { DomainEvent } from "@shared/shared/domain";

const OrderEventKeys = {
    MailSended: "order.mailSended",
    StatusChangedToCreated: "order.statusChangedToOpen",
    statusChangedToValidated: "order.statusChangedToValidated"
}

export class OrderIsEvent {
    public static isOrderMailSendedEvent(event: DomainEvent<unknown>): event is OrderMailSendedEvent {
        return event.key === OrderEventKeys.MailSended;
    }

    public static isOrderStatusChangedToCreatedEvent(event: DomainEvent<unknown>): event is OrderStatusChangedToCreatedEvent {
        return event.key === OrderEventKeys.StatusChangedToCreated;
    }

    public static isOrderStatusChangedToValidatedEvent(event: DomainEvent<unknown>): event is OrderStatusChangedToValidatedEvent {
        return event.key === OrderEventKeys.statusChangedToValidated;
    }

}

export type OrderMailSendedEventPayload = {
    orderId: string;
}
export class OrderMailSendedEvent extends DomainEvent<OrderMailSendedEventPayload> {
    constructor(orderId: string) {
        super({ key: OrderEventKeys.MailSended, value: { orderId } });
    }
}

export type OrderStatusChangedToCreatedEventPayload = {
    orderId: string;
}
export class OrderStatusChangedToCreatedEvent extends DomainEvent<OrderStatusChangedToCreatedEventPayload> {
    constructor(orderId: string) {
        super({ key: OrderEventKeys.StatusChangedToCreated, value: { orderId } });
    }
}

export type OrderStatusChangedToValidatedEventPayload = {
    orderId: string;
}
export class OrderStatusChangedToValidatedEvent extends DomainEvent<OrderStatusChangedToValidatedEventPayload> {
    constructor(orderId: string) {
        super({ key: OrderEventKeys.statusChangedToValidated, value: { orderId } });
    }
}
