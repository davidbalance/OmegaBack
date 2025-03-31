import { ConflictError } from "@shared/shared/domain/error";

export class ExamExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Exam External Key=${owner}-${value} already exists.`);
    }
}