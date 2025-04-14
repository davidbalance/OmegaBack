import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ClientNotFoundError extends NotFoundError {
    constructor(dni: string) {
        super(`Client=${dni} was not found.`);
    }
}

export class ClientConflictError extends ConflictError {
    constructor(value: string) {
        super(`Client=${value} already exists.`);
    }
}