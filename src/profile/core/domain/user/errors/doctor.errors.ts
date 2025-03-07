import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class DoctorNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Doctor=${value} was not found.`);
    }
}

export class DoctorConflictError extends ConflictError {
    constructor(userDni: string) {
        super(`Doctor=${userDni} already exists.`);
    }
}