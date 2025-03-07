import { DomainEvent } from "@shared/shared/domain";
import { ExamSubtype } from "../exam-subtype.domain";

const ExamTypeEventKeys = {
    Renamed: "examType.renamed",
    Removed: "examType.removed",
    SubtypeAdded: "examType.subtypeAdded",
    SubtypeRemoved: "examType.subtypeRemoved",
    SubtypeMoved: "examType.subtypeMoved",
}

export class ExamTypeIsEvent {

    public static isExamTypeRenamedEvent(event: DomainEvent<unknown>): event is ExamTypeRenamedEvent {
        return event.key === ExamTypeEventKeys.Renamed;
    }

    public static isExamTypeRemovedEvent(event: DomainEvent<unknown>): event is ExamTypeRemovedEvent {
        return event.key === ExamTypeEventKeys.Removed;
    }

    public static isExamTypeSubtypeAddedEvent(event: DomainEvent<unknown>): event is ExamTypeSubtypeAddedEvent {
        return event.key === ExamTypeEventKeys.SubtypeAdded;
    }

    public static isExamTypeSubtypeRemovedEvent(event: DomainEvent<unknown>): event is ExamTypeSubtypeRemovedEvent {
        return event.key === ExamTypeEventKeys.SubtypeRemoved;
    }

    public static isExamTypeSubtypeMovedEvent(event: DomainEvent<unknown>): event is ExamTypeSubtypeMovedEvent {
        return event.key === ExamTypeEventKeys.SubtypeMoved;
    }
}

export type ExamTypeRenamedEventPayload = {
    typeId: string;
    name: string;
}
export class ExamTypeRenamedEvent extends DomainEvent<ExamTypeRenamedEventPayload> {
    constructor(value: ExamTypeRenamedEventPayload) {
        super({ key: ExamTypeEventKeys.Renamed, value });
    }
}

export type ExamTypeRemovedEventPayload = {
    typeId: string;
}
export class ExamTypeRemovedEvent extends DomainEvent<ExamTypeRemovedEventPayload> {
    constructor(typeId: string) {
        super({ key: ExamTypeEventKeys.Removed, value: { typeId } });
    }
}

export class ExamTypeSubtypeAddedEvent extends DomainEvent<ExamSubtype> {
    constructor(value: ExamSubtype) {
        super({ key: ExamTypeEventKeys.SubtypeAdded, value });
    }
}

export type ExamTypeSubtypeRemovedEventPayload = {
    subtypeId: string;
}
export class ExamTypeSubtypeRemovedEvent extends DomainEvent<ExamTypeSubtypeRemovedEventPayload> {
    constructor(subtypeId: string) {
        super({ key: ExamTypeEventKeys.SubtypeRemoved, value: { subtypeId } });
    }
}

export type ExamTypeSubtypeMovedEventPayload = {
    fromExamType: string;
    toExamType: string;
    subtypeId: string;
}
export class ExamTypeSubtypeMovedEvent extends DomainEvent<ExamTypeSubtypeMovedEventPayload> {
    constructor(value: ExamTypeSubtypeMovedEventPayload) {
        super({ key: ExamTypeEventKeys.SubtypeMoved, value });
    }
}