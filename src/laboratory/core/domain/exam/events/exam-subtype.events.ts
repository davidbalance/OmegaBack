import { DomainEvent } from "@shared/shared/domain";
import { Exam } from "../exam.domain";

const ExamSubtypeEventKeys = {
    Renamed: "examSubtype.renamed",
    ExamAdded: "examSubtype.examAdded",
    ExamRemoved: "examSubtype.examRemoved",
    ExamMoved: "examSubtype.examMoved",
}

export class ExamSubtypeIsEvent {
    public static isExamSubtypeRenamedEvent(event: DomainEvent<unknown>): event is ExamSubtypeRenamedEvent {
        return event.key === ExamSubtypeEventKeys.Renamed;
    }

    public static isExamSubtypeExamAddedEvent(event: DomainEvent<unknown>): event is ExamSubtypeExamAddedEvent {
        return event.key === ExamSubtypeEventKeys.ExamAdded;
    }

    public static isExamSubtypeExamRemovedEvent(event: DomainEvent<unknown>): event is ExamSubtypeExamRemovedEvent {
        return event.key === ExamSubtypeEventKeys.ExamRemoved;
    }

    public static isExamSubtypeExamMovedEvent(event: DomainEvent<unknown>): event is ExamSubtypeExamMovedEvent {
        return event.key === ExamSubtypeEventKeys.ExamMoved;
    }
}

export type ExamSubtypeRenamedEventPayload = {
    subtypeId: string;
    subtypeName: string;
}
export class ExamSubtypeRenamedEvent extends DomainEvent<ExamSubtypeRenamedEventPayload> {
    constructor(value: ExamSubtypeRenamedEventPayload) {
        super({ key: ExamSubtypeEventKeys.Renamed, value });
    }
}

export class ExamSubtypeExamAddedEvent extends DomainEvent<Exam> {
    constructor(value: Exam) {
        super({ key: ExamSubtypeEventKeys.ExamAdded, value });
    }
}

export type ExamSubtypeExamRemovedEventPayload = {
    examId: string;
}
export class ExamSubtypeExamRemovedEvent extends DomainEvent<ExamSubtypeExamRemovedEventPayload> {
    constructor(examId: string) {
        super({ key: ExamSubtypeEventKeys.ExamRemoved, value: { examId } });
    }
}

export type ExamSubtypeMoveSubtypeEventPayload = {
    fromTypeId: string;
    fromSubtypeId: string;
    toTypeId: string;
    toSubtypeId: string;
    examId: string;
}
export class ExamSubtypeExamMovedEvent extends DomainEvent<ExamSubtypeMoveSubtypeEventPayload> {
    constructor(value: ExamSubtypeMoveSubtypeEventPayload) {
        super({ key: ExamSubtypeEventKeys.ExamMoved, value });
    }
}