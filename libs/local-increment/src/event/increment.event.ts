import { DomainEvent } from "@shared/shared/domain";

const IncrementEventKeys = {
    Next: "increment.next",
}

export class IncrementIsEvent {
    public static isIncrementNextEvent(event: DomainEvent<unknown>): event is IncrementNextEvent {
        return event.key === IncrementEventKeys.Next;
    }
}

export type IncrementNextEventPayload = {
    incrementId: string;
    incrementCount: number;
}
export class IncrementNextEvent extends DomainEvent<IncrementNextEventPayload> {
    constructor(value: IncrementNextEventPayload) {
        super({ key: IncrementEventKeys.Next, value });
    }
}