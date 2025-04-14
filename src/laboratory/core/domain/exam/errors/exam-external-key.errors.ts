import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ExamExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Exam External Key=(${owner} - ${value}) already exists.`);
    }
}

export class ExamExternalKeyNotFoundError extends NotFoundError {
    constructor(owner: string, value: string) {
        super(`Exam External Key=(${owner} - ${value}) not found.`);
    }
}