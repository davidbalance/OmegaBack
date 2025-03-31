import { ConflictError } from "@shared/shared/domain/error";

export class CompanyExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Company External Key=${owner}-${value} already exists.`);
    }
}