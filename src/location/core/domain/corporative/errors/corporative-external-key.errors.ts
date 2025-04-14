import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class CorporativeExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Corporative External Key=(${owner} - ${value}) already exists.`);
    }
}

export class CorporativeExternalKeyNotFoundError extends NotFoundError {
    constructor(owner: string, value: string) {
        super(`Corporative External Key=(${owner} - ${value}) not found.`);
    }
}