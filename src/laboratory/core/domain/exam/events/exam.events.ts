import { DomainEvent } from "@shared/shared/domain";
import { ExamExternalKey, ExamExternalKeyProps } from "../value-objects/exam-external-key.value-object";

const ExamEventKeys = {
    Renamed: "exam.renamed",
    ExamAdded: "exam.examAdded",
    ExamRemoved: "exam.examRemoved",
    ExternalKeyAdded: "exam.externalKey.added",
}

export class ExamIsEvent {
    public static isExamRenamedEvent(event: DomainEvent<unknown>): event is ExamRenamedEvent {
        return event.key === ExamEventKeys.Renamed;
    }

    public static isExamExternalKeyAddedEvent(event: DomainEvent<unknown>): event is ExamExternalKeyAddedEvent {
        return event.key === ExamEventKeys.ExternalKeyAdded;
    }
}

type ExamRenamedEventPayload = {
    examId: string;
    examName: string;
}
export class ExamRenamedEvent extends DomainEvent<ExamRenamedEventPayload> {
    constructor(value: ExamRenamedEventPayload) {
        super({ key: ExamEventKeys.Renamed, value });
    }
}

export class ExamExternalKeyAddedEvent extends DomainEvent<ExamExternalKeyProps> {
    constructor(value: ExamExternalKeyProps) {
        super({ key: ExamEventKeys.ExternalKeyAdded, value });
    }
}