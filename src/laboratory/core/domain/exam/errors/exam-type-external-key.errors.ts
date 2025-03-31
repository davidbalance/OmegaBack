import { ConflictError } from "@shared/shared/domain/error";

export class ExamTypeExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Exam Type External Key=${owner}-${value} already exists.`);
    }
}