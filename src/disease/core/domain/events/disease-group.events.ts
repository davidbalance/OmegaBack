import { DomainEvent } from "@shared/shared/domain";
import { Disease } from "../disease.domain";

const DiseaseGroupEventKeys = {
    Renamed: "diseaseGroup.renamed",
    Removed: "diseaseGroup.removed",
    DiseaseAdded: "diseaseGroup.diseaseAdded",
    DiseaseRemoved: "diseaseGroup.diseaseRemoved",
    DiseaseMoved: "diseaseGroup.diseaseMoved",
}

export class DiseaseGroupIsEvent {
    public static isDiseaseGroupRenamedEvent(event: DomainEvent<unknown>): event is DiseaseGroupRenamedEvent {
        return event.key === DiseaseGroupEventKeys.Renamed;
    }
    public static isDiseaseGroupRemovedEvent(event: DomainEvent<unknown>): event is DiseaseGroupRemovedEvent {
        return event.key === DiseaseGroupEventKeys.Removed;
    }
    public static isDiseaseGroupDiseaseAddedEvent(event: DomainEvent<unknown>): event is DiseaseGroupDiseaseAddedEvent {
        return event.key === DiseaseGroupEventKeys.DiseaseAdded;
    }
    public static isDiseaseGroupDiseaseRemovedEvent(event: DomainEvent<unknown>): event is DiseaseGroupDiseaseRemovedEvent {
        return event.key === DiseaseGroupEventKeys.DiseaseRemoved;
    }
    public static isDiseaseGroupDiseaseMovedEvent(event: DomainEvent<unknown>): event is DiseaseGroupDiseaseMovedEvent {
        return event.key === DiseaseGroupEventKeys.DiseaseMoved;
    }
}

export type DiseaseGroupRenamedEventPayload = {
    groupId: string;
    name: string;
}
export class DiseaseGroupRenamedEvent extends DomainEvent<DiseaseGroupRenamedEventPayload> {
    constructor(value: DiseaseGroupRenamedEventPayload) {
        super({ key: DiseaseGroupEventKeys.Renamed, value });
    }
}

export type DiseaseGroupRemovedEventPayload = {
    groupId: string;
}
export class DiseaseGroupRemovedEvent extends DomainEvent<DiseaseGroupRemovedEventPayload> {
    constructor(groupId: string) {
        super({ key: DiseaseGroupEventKeys.Removed, value: { groupId } });
    }
}

export class DiseaseGroupDiseaseAddedEvent extends DomainEvent<Disease> {
    constructor(value: Disease) {
        super({ key: DiseaseGroupEventKeys.DiseaseAdded, value });
    }
}

export type DiseaseGroupDiseaseRemovedEventPayload = {
    diseaseId: string;
}
export class DiseaseGroupDiseaseRemovedEvent extends DomainEvent<DiseaseGroupDiseaseRemovedEventPayload> {
    constructor(diseaseId: string) {
        super({ key: DiseaseGroupEventKeys.DiseaseRemoved, value: { diseaseId } });
    }
}

export type DiseaseGroupDiseaseMovedEventPayload = {
    targetId: string;
    diseaseId: string;
}
export class DiseaseGroupDiseaseMovedEvent extends DomainEvent<DiseaseGroupDiseaseMovedEventPayload> {
    constructor(value: DiseaseGroupDiseaseMovedEventPayload) {
        super({ key: DiseaseGroupEventKeys.DiseaseMoved, value });
    }
}