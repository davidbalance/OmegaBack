import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class AuthResourceConflictError extends ConflictError {
    constructor(value: string) {
        super(`Auth Resource=${value} is already used.`);
    }
}

export class AuthResourceNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Resource=${value} was not found.`);
    }
}
