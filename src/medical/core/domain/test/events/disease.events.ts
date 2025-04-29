import { DomainEvent } from "@shared/shared/domain";
import { DiseaseReport } from "../disease-report.domain";

const DiseaseReportEventKeys = {
    Updated: "report.updated",
};

export class DiseaseReportIsEvent {
    public static isDiseaseReportUpdatedEvent(event: DomainEvent<unknown>): event is DiseaseReportUpdatedEvent {
        return event.key === DiseaseReportEventKeys.Updated;
    }
}

export class DiseaseReportUpdatedEvent extends DomainEvent<DiseaseReport> {
    constructor(value: DiseaseReport) {
        super({ key: DiseaseReportEventKeys.Updated, value });
    }
}