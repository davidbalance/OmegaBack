import { ConflictError } from "@shared/shared/domain/error";

export class TestExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Test External Key=${owner}-${value} already exists.`);
    }
}