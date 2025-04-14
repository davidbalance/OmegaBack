import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class AreaNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Area=${value} was not found.`);
    }
}

export class AreaConflictError extends ConflictError {
    constructor(value: string) {
        super(`Area=${value} already exists.`);
    }
}