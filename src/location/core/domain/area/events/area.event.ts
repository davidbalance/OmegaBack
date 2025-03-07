import { DomainEvent } from "@shared/shared/domain";

const AreaEventKeys = {
    Renamed: "area.renamed",
    Removed: "area.removed",
}

export class AreaIsEvent {
    public static isAreaRenamedEvent(event: DomainEvent<unknown>): event is AreaRenamedEvent {
        return event.key === AreaEventKeys.Renamed;
    }

    public static isAreaRemovedEvent(event: DomainEvent<unknown>): event is AreaRemovedEvent {
        return event.key === AreaEventKeys.Removed;
    }
}

export type AreaRenamedEventPayload = {
    areaId: string;
    areaName: string;
}
export class AreaRenamedEvent extends DomainEvent<AreaRenamedEventPayload> {
    constructor(value: AreaRenamedEventPayload) {
        super({ key: AreaEventKeys.Renamed, value });
    }
}

export type AreaRemovedEventPayload = {
    areaId: string;
}
export class AreaRemovedEvent extends DomainEvent<AreaRemovedEventPayload> {
    constructor(areaId: string) {
        super({ key: AreaEventKeys.Removed, value: { areaId } });
    }
}