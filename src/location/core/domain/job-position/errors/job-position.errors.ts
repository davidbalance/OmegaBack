import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class JobPositionConflictError extends ConflictError {
    constructor(jobPositionName: string) {
        super(`Job position=${jobPositionName} already exists.`);
    }
}

export class JobPositionNotFoundError extends NotFoundError {
    constructor(jobPositionId: string) {
        super(`Job position=${jobPositionId} was not found.`);
    }
}