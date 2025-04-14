import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class TokenUnauthorizeError extends Error {
    constructor() {
        super('Invalid token.');
    }
}

export class TokenConflictError extends ConflictError {
    constructor() {
        super(`Auth has already an active token.`);
    }
}

export class TokenNotFoundError extends NotFoundError {
    constructor() {
        super(`Auth don't have a token.`);
    }
}
