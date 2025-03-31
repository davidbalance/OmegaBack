import { DomainEvent } from "@shared/shared/domain";
import { OrderExternalKey } from "../order-external-key.domain";

const OrderEventKeys = {
    Removed: "order.removed",
    MailSended: "order.mailSended",
    StatusChangedToCreated: "order.statusChangedToOpen",
    StatusChangedToValidated: "order.statusChangedToValidated",
    ExternalKeyAdded: "order.externalKey.externalKeyAdded",
}

export class OrderIsEvent {
    public static isOrderMailSendedEvent(event: DomainEvent<unknown>): event is OrderMailSendedEvent {
        return event.key === OrderEventKeys.MailSended;
    }

    public static isOrderStatusChangedToCreatedEvent(event: DomainEvent<unknown>): event is OrderStatusChangedToCreatedEvent {
        return event.key === OrderEventKeys.StatusChangedToCreated;
    }

    public static isOrderStatusChangedToValidatedEvent(event: DomainEvent<unknown>): event is OrderStatusChangedToValidatedEvent {
        return event.key === OrderEventKeys.StatusChangedToValidated;
    }

    public static isOrderRemovedEvent(event: DomainEvent<unknown>): event is OrderRemovedEvent {
        return event.key === OrderEventKeys.Removed;
    }

    public static isOrderExternalKeyAddedEvent(event: DomainEvent<unknown>): event is OrderExternalKeyAddedEvent {
        return event.key === OrderEventKeys.ExternalKeyAdded;
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
        super({ key: OrderEventKeys.StatusChangedToValidated, value: { orderId } });
    }
}

export type OrderRemovedEventPayload = {
    orderId: string;
}
export class OrderRemovedEvent extends DomainEvent<OrderRemovedEventPayload> {
    constructor(orderId: string) {
        super({ key: OrderEventKeys.Removed, value: { orderId } });
    }
}

export class OrderExternalKeyAddedEvent extends DomainEvent<OrderExternalKey> {
    constructor(value: OrderExternalKey) {
        super({ key: OrderEventKeys.ExternalKeyAdded, value });
    }
}
