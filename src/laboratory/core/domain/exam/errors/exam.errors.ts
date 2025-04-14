import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ExamNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Exam=${value} not found.`);
    }
}

export class ExamConflictError extends ConflictError {
    constructor(value: string) {
        super(`Exam=${value} already exists.`);
    }
}