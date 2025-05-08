import { DomainEvent } from "@shared/shared/domain";
import { OrderExternalKey } from "../value-objects/order-external-key.value-object";

const OrderEventKeys = {
    Removed: "order.removed",
    ProcessChanged: "order.process-changed",
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

    public static isOrderProcessChangedEvent(event: DomainEvent<unknown>): event is OrderProcessChangedEvent {
        return event.key === OrderEventKeys.ProcessChanged;
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

export type OrderProcessChangedEventPayload = {
    orderId: string;
    process: string;
}
export class OrderProcessChangedEvent extends DomainEvent<OrderProcessChangedEventPayload> {
    constructor(value: OrderProcessChangedEventPayload) {
        super({ key: OrderEventKeys.ProcessChanged, value });
    }
}
