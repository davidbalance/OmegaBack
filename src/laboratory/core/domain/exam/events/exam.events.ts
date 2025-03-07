import { DomainEvent } from "@shared/shared/domain";

const ExamEventKeys = {
    Renamed: "exam.renamed",
    ExamAdded: "exam.examAdded",
    ExamRemoved: "exam.examRemoved",
}

export class ExamIsEvent {
    public static isExamRenamedEvent(event: DomainEvent<unknown>): event is ExamRenamedEvent {
        return event.key === ExamEventKeys.Renamed;
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