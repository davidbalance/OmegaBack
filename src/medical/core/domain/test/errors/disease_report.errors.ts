import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class DiseaseReportConflictError extends ConflictError {
    constructor(testId: string, value: string) {
        super(`Test=${testId} already has disease=${value}.`);
    }
}

export class DiseaseReportNotFoundError extends NotFoundError {
    constructor(diseaseId: string) {
        super(`Disease Report=${diseaseId} not found.`);
    }
}