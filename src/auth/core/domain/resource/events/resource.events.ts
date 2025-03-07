import { DomainEvent } from "@shared/shared/domain";
import { Resource } from "../resource.domain";

const ResourceEventKeys = {
    Edited: "resource.edited",
    Removed: "resource.removed",
};

export class ResourceIsEvent {
    public static isResourceEditedEvent(event: DomainEvent<unknown>): event is ResourceEditedEvent {
        return event.key === ResourceEventKeys.Edited;
    }

    public static isResourceRemovedEvent(event: DomainEvent<unknown>): event is ResourceRemovedEvent {
        return event.key === ResourceEventKeys.Removed;
    }
}

export class ResourceEditedEvent extends DomainEvent<Resource> {
    constructor(value: Resource) {
        super({ key: ResourceEventKeys.Edited, value });
    }
}

export type ResourceRemovedEventPayload = {
    resourceId: string;
}
export class ResourceRemovedEvent extends DomainEvent<ResourceRemovedEventPayload> {
    constructor(resourceId: string) {
        super({ key: ResourceEventKeys.Removed, value: { resourceId } });
    }
}
