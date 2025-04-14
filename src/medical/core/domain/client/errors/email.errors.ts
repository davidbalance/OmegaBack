import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class EmailConflictError extends ConflictError {
    constructor(value: string) {
        super(`Email=${value} already in use.`);
    }
}

export class EmailNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Email=${value} was not found.`);
    }
}