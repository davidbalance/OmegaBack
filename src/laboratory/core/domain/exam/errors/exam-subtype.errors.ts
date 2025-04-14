import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ExamSubtypeConflictError extends ConflictError {
    constructor(value: string) {
        super(`Exam Subtype=${value} already exists.`);
    }
}

export class ExamSubtypeNotFoundError extends NotFoundError {
    constructor(subtypeId: string) {
        super(`Exam subtype=${subtypeId} not found.`);
    }
}