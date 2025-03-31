import { DomainEvent } from "@shared/shared/domain";
import { OrderExternalKey } from "../order-external-key.domain";

const OrderExternalKeyEventKeys = {
    Created: "order.created",
}

export class OrderExternalKeyIsEvent {
    public static isOrderExternalKeyCreatedEvent(event: DomainEvent<unknown>): event is OrderExternalKeyCreatedEvent {
        return event.key === OrderExternalKeyEventKeys.Created;
    }
}

export class OrderExternalKeyCreatedEvent extends DomainEvent<OrderExternalKey> {
    constructor(value: OrderExternalKey) {
        super({ key: OrderExternalKeyEventKeys.Created, value });
    }
}
