import { DomainEvent } from "./domain-event";
import { Entity, EntityProps } from "./entity";


const AggregatedEventKey = {
    AggregateCreated: "aggregate.created",
}

class AggregatedCreatedEvent<T> extends DomainEvent<T> {
    constructor(value: T) {
        super({ key: AggregatedEventKey.AggregateCreated, value });
    }
}

export class AggregateEvent {
    public static isAggregatedCreatedEvent<T>(event: DomainEvent<unknown>): event is AggregatedCreatedEvent<T> {
        return event.key === AggregatedEventKey.AggregateCreated;
    }
}

export type AggregateProps = EntityProps;

export abstract class Aggregate<T extends AggregateProps> extends Entity<T> {
    private _events: Array<DomainEvent<unknown>> = [];

    protected constructor(props: T) {
        super(props);
        this.emit(new AggregatedCreatedEvent(this));
    }

    public commit(): void {
        this._events = [];
    }

    public uncommitted(): ReadonlyArray<DomainEvent<unknown>> {
        return this._events;
    }

    protected emit(event: DomainEvent<unknown>): void {
        this._events.push(event);
    }
}