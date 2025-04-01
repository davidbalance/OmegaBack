import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class CompanyExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Company External Key=${owner}-${value} already exists.`);
    }
}

export class CompanyExternalKeyNotFoundError extends NotFoundError {
    constructor(owner: string, value: string) {
        super(`Company External Key=${owner}-${value} not found.`);
    }
}