import { ConflictError } from "@shared/shared/domain/error";

export class ExamSubtypeExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Exam Subtype External Key=${owner}-${value} already exists.`);
    }
}