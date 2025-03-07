import { DomainEvent } from "@shared/shared/domain";
import { Report } from "../report.domain";

const ReportEventKeys = {
    Created: "report.created",
    AddedContent: "report.addedContent",
    AddedFilepath: "report.addedFilepath",
    RemovedContent: "report.removedContent",
};

export class ReportIsEvent {
    public static isReportCreatedEvent(event: DomainEvent<unknown>): event is ReportCreatedEvent {
        return event.key === ReportEventKeys.Created;
    }

    public static isReportAddedContentEvent(event: DomainEvent<unknown>): event is ReportAddedContentEvent {
        return event.key === ReportEventKeys.AddedContent;
    }

    public static isReportAddedFilepathEvent(event: DomainEvent<unknown>): event is ReportAddedFilepathEvent {
        return event.key === ReportEventKeys.AddedFilepath;
    }

    public static isReportRemovedContentEvent(event: DomainEvent<unknown>): event is ReportRemovedContentEvent {
        return event.key === ReportEventKeys.RemovedContent;
    }
}

export class ReportCreatedEvent extends DomainEvent<Report> {
    constructor(value: Report) {
        super({ key: ReportEventKeys.Created, value });
    }
}

export type ReportAddedContentEventPayload = {
    reportId: string;
    content: string;
}
export class ReportAddedContentEvent extends DomainEvent<ReportAddedContentEventPayload> {
    constructor(value: ReportAddedContentEventPayload) {
        super({ key: ReportEventKeys.AddedContent, value });
    }
}

export type ReportAddedFilepathEventPayload = {
    reportId: string;
    filepath: string;
}
export class ReportAddedFilepathEvent extends DomainEvent<ReportAddedFilepathEventPayload> {
    constructor(value: ReportAddedFilepathEventPayload) {
        super({ key: ReportEventKeys.AddedFilepath, value });
    }
}

export type ReportRemovedContentEventPayload = {
    reportId: string;
}
export class ReportRemovedContentEvent extends DomainEvent<ReportRemovedContentEventPayload> {
    constructor(reportId: string) {
        super({ key: ReportEventKeys.RemovedContent, value: { reportId } });
    }
}