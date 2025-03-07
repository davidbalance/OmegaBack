import { DomainEvent } from "@shared/shared/domain";

const ManagementEventKeys = {
    Renamed: "management.renamed",
    Removed: "management.removed",
}

export class ManagementIsEvent {
    public static isManagementRenamedEvent(event: DomainEvent<unknown>): event is ManagementRenamedEvent {
        return event.key === ManagementEventKeys.Renamed;
    }

    public static isManagementRemovedEvent(event: DomainEvent<unknown>): event is ManagementRemovedEvent {
        return event.key === ManagementEventKeys.Removed;
    }

}

export type ManagementRenamedEventPayload = {
    managementId: string;
    managementName: string;
}
export class ManagementRenamedEvent extends DomainEvent<ManagementRenamedEventPayload> {
    constructor(value: ManagementRenamedEventPayload) {
        super({ key: ManagementEventKeys.Renamed, value });
    }
}

export type ManagementRemovedEventPayload = {
    managementId: string;
}
export class ManagementRemovedEvent extends DomainEvent<ManagementRemovedEventPayload> {
    constructor(managementId: string) {
        super({ key: ManagementEventKeys.Removed, value: { managementId } });
    }
}