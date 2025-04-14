import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class BranchExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Branch External Key=(${owner} - ${value}) already exists.`);
    }
}

export class BranchExternalKeyNotFoundError extends NotFoundError {
    constructor(owner: string, value: string) {
        super(`Branch External Key=(${owner} - ${value}) already exists.`);
    }
}