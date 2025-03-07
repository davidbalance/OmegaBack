import { DomainEvent } from "@shared/shared/domain";
import { Result } from "../result.domain";

const ResultEventKeys = {
    Created: "result.created",
    FileAdded: "result.fileAdded",
    FileRemoved: "result.fileRemoved",
};

export class ResultIsEvent {
    public static isResultCreatedEvent(event: DomainEvent<unknown>): event is ResultCreatedEvent {
        return event.key === ResultEventKeys.Created;
    }

    public static isResultFileAddedEvent(event: DomainEvent<unknown>): event is ResultFileAddedEvent {
        return event.key === ResultEventKeys.FileAdded;
    }

    public static isResultFileRemovedEvent(event: DomainEvent<unknown>): event is ResultFileRemovedEvent {
        return event.key === ResultEventKeys.FileRemoved;
    }
}

export class ResultCreatedEvent extends DomainEvent<Result> {
    constructor(value: Result) {
        super({ key: ResultEventKeys.Created, value });
    }
}

export type ResultFileAddedEventPayload = {
    resultId: string;
    filepath: string;
}
export class ResultFileAddedEvent extends DomainEvent<ResultFileAddedEventPayload> {
    constructor(value: ResultFileAddedEventPayload) {
        super({ key: ResultEventKeys.FileAdded, value });
    }
}

export type ResultFileRemovedEventPayload = {
    resultId: string;
}
export class ResultFileRemovedEvent extends DomainEvent<ResultFileRemovedEventPayload> {
    constructor(resultId: string) {
        super({ key: ResultEventKeys.FileRemoved, value: { resultId } });
    }
}