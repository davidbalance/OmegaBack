import { ConflictError } from "@shared/shared/domain/error";

export class UserNotFoundError extends Error {
    constructor(value: string) {
        super(`User=${value} not found.`);
    }
}

export class UserConflictError extends ConflictError {
    constructor(userDni: string) {
        super(`User=${userDni} already exists.`);
    }
}