import { NotFoundError } from "@shared/shared/domain/error";

export class ReportNotFoundError extends NotFoundError {
    constructor(testId: string) {
        super(`Test=${testId} not have a report.`);
    }
}