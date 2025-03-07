import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class BranchConflictError extends ConflictError {
    constructor(value: string) {
        super(`Branch=${value} already exists.`);
    }
}

export class BranchNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Branch=${value} was not found.`);
    }
}