import { DomainEvent } from "@shared/shared/domain";
import { Exam } from "../exam.domain";
import { ExamSubtypeExternalKey, ExamSubtypeExternalKeyProps } from "../value-objects/exam-subtype-external-key.value-object";
import { ExamExternalKeyProps } from "../value-objects/exam-external-key.value-object";

const ExamSubtypeEventKeys = {
    Renamed: "examSubtype.renamed",
    ExamAdded: "examSubtype.examAdded",
    ExamRemoved: "examSubtype.examRemoved",
    ExamMoved: "examSubtype.examMoved",
    ExternalKeyAdded: "examSubtype.externalKey.added",
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

    public static isExamSubtypeExternalKeyAddedEvent(event: DomainEvent<unknown>): event is ExamSubtypeExternalKeyAddedEvent {
        return event.key === ExamSubtypeEventKeys.ExternalKeyAdded;
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

export class ExamSubtypeExternalKeyAddedEvent extends DomainEvent<ExamSubtypeExternalKeyProps> {
    constructor(value: ExamSubtypeExternalKeyProps) {
        super({ key: ExamSubtypeEventKeys.ExternalKeyAdded, value });
    }
}