import { ExamPayload } from "../payloads/test.payloads";
import { DiseaseReport } from "../disease-report.domain";
import { DomainEvent } from "@shared/shared/domain";
import { TestExternalKey } from "../value-objects/test-external-key.value-object";

const TestEventKeys = {
    Removed: "test.removed",
    Reactivated: "test.reactivated",
    Checked: "test.checked",
    Unchecked: "test.unchecked",
    ExamChanged: "test.examChanged",
    DiseaseAdded: "test.diseaseAdded",
    DiseaseRemoved: "test.diseaseRemoved",
    ExternalKeyAdded: "test.externalKey.externalKeyAdded",
};

export class TestIsEvent {
    public static isTestRemovedEvent(event: DomainEvent<unknown>): event is TestRemovedEvent {
        return event.key === TestEventKeys.Removed;
    }

    public static isTestReactivatedEvent(event: DomainEvent<unknown>): event is TestReactivatedEvent {
        return event.key === TestEventKeys.Reactivated;
    }

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

    public static isTestExternalKeyAddedEvent(event: DomainEvent<unknown>): event is TestExternalKeyAddedEvent {
        return event.key === TestEventKeys.ExternalKeyAdded;
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

export type TestRemovedEventPayload = { testId: string };
export class TestRemovedEvent extends DomainEvent<TestRemovedEventPayload> {
    constructor(testId: string) {
        super({ key: TestEventKeys.Removed, value: { testId } });
    }
}

export type TestReactivatedEventPayload = { testId: string };
export class TestReactivatedEvent extends DomainEvent<TestReactivatedEventPayload> {
    constructor(testId: string) {
        super({ key: TestEventKeys.Reactivated, value: { testId } });
    }
}

export class TestExternalKeyAddedEvent extends DomainEvent<TestExternalKey> {
    constructor(value: TestExternalKey) {
        super({ key: TestEventKeys.ExternalKeyAdded, value });
    }
}
