import { ConflictError, NotFoundError, UnauthorizedError } from "@shared/shared/domain/error";

export class AuthConflictError extends ConflictError {
    constructor(value: string) {
        super(`Email=${value} is already in use.`)
    }
}

export class AuthNotFoundError extends NotFoundError {
    constructor(authId: string) {
        super(`Auth=${authId} was not found.`)
    }
}

export class AuthInvalidCredencialError extends UnauthorizedError {
    constructor() {
        super(`Invalid credentials.`)
    }
}