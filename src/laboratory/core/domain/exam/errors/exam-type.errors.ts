import { BadRequestError, ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ExamTypeNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Exam type=${value} not found.`);
    }
}

export class ExamTypeConflictError extends ConflictError {
    constructor(value: string) {
        super(`Exam type=${value} already exists.`);
    }
}

export class ExamTypeInvalidError extends BadRequestError {
    constructor(action: string) {
        super(`Exam Type invalid action=${action}.`);
    }
}