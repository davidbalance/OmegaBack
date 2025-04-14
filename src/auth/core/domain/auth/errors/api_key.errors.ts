import { ConflictError, NotFoundError, UnauthorizedError } from "@shared/shared/domain/error";

export class ApiKeyConflictError extends ConflictError {
    constructor(value: string) {
        super(`ApiKey=${value} already exists.`);
    }
}

export class ApiKeyInvalidError extends UnauthorizedError {
    constructor() {
        super(`Invalid apikey.`);
    }
}

export class ApiKeyNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Apikey=${value} was not found.`);
    }
}