import { DomainEvent } from "@shared/shared/domain";

const JobPositionEventKeys = {
    Renamed: "jobPosition.renamed",
    Removed: "jobPosition.removed",
}

export class JobPositionIsEvent {
    public static isJobPositionRenamedEvent(event: DomainEvent<unknown>): event is JobPositionRenamedEvent {
        return event.key === JobPositionEventKeys.Renamed;
    }

    public static isJobPositionRemovedEvent(event: DomainEvent<unknown>): event is JobPositionRemovedEvent {
        return event.key === JobPositionEventKeys.Removed;
    }

}

export type JobPositionRenamedEventPayload = {
    jobPositionId: string;
    jobPositionName: string;
}
export class JobPositionRenamedEvent extends DomainEvent<JobPositionRenamedEventPayload> {
    constructor(value: JobPositionRenamedEventPayload) {
        super({ key: JobPositionEventKeys.Renamed, value });
    }
}

export type JobPositionRemovedEventPayload = {
    jobPositionId: string;
}
export class JobPositionRemovedEvent extends DomainEvent<JobPositionRemovedEventPayload> {
    constructor(jobPositionId: string) {
        super({ key: JobPositionEventKeys.Removed, value: { jobPositionId } });
    }
}