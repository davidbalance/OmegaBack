import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ExamTypeExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Exam Type External Key=${owner}-${value} already exists.`);
    }
}

export class ExamTypeExternalKeyNotFoundError extends NotFoundError {
    constructor(owner: string, value: string) {
        super(`Exam Type External Key=${owner}-${value} not found.`);
    }
}