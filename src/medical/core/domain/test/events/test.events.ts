import { ExamPayload } from "../payloads/test.payloads";
import { DiseaseReport } from "../disease_report.domain";
import { DomainEvent } from "@shared/shared/domain";

const TestEventKeys = {
    Checked: "test.checked",
    Unchecked: "test.unchecked",
    ExamChanged: "test.examChanged",
    DiseaseAdded: "test.diseaseAdded",
    DiseaseRemoved: "test.diseaseRemoved"
};

export class TestIsEvent {
    public static isTestCheckedEvent(event: DomainEvent<unknown>): event is TestCheckedEvent {
        return event.key === TestEventKeys.Checked;
    }

    public static isTestUncheckedEvent(event: DomainEvent<unknown>): event is TestUncheckedEvent {
        return event.key === TestEventKeys.Unchecked;
    }

    public static isTestExamChangedEvent(event: DomainEvent<unknown>): event is TestExamChangedEvent {
        return event.key === TestEventKeys.ExamChanged;
    }

    public static isTestDiseaseAddedEvent(event: DomainEvent<unknown>): event is TestDiseaseAddedEvent {
        return event.key === TestEventKeys.DiseaseAdded;
    }

    public static isTestDiseaseRemovedEvent(event: DomainEvent<unknown>): event is TestDiseaseRemovedEvent {
        return event.key === TestEventKeys.DiseaseRemoved;
    }
}

export type TestCheckedEventPayload = {
    testId: string;
}
export class TestCheckedEvent extends DomainEvent<TestCheckedEventPayload> {
    constructor(testId: string) {
        super({ key: TestEventKeys.Checked, value: { testId } });
    }
}

export type TestUncheckedEventPayload = {
    testId: string;
}
export class TestUncheckedEvent extends DomainEvent<TestUncheckedEventPayload> {
    constructor(testId: string) {
        super({ key: TestEventKeys.Unchecked, value: { testId } });
    }
}

export type TestExamChangedEventPayload = ExamPayload & { testId: string };
export class TestExamChangedEvent extends DomainEvent<TestExamChangedEventPayload> {
    constructor(value: TestExamChangedEventPayload) {
        super({ key: TestEventKeys.ExamChanged, value });
    }
}

export class TestDiseaseAddedEvent extends DomainEvent<DiseaseReport> {
    constructor(value: DiseaseReport) {
        super({ key: TestEventKeys.DiseaseAdded, value });
    }
}

export type TestDiseaseRemovedEventPayload = { diseaseId: string };
export class TestDiseaseRemovedEvent extends DomainEvent<TestDiseaseRemovedEventPayload> {
    constructor(diseaseId: string) {
        super({ key: TestEventKeys.DiseaseRemoved, value: { diseaseId } });
    }
}
