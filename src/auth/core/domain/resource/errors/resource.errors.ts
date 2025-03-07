import { BadRequestError, ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ResourceNotFoundError extends NotFoundError {
    constructor(resourceId: string) {
        super(`Resource=${resourceId} was not found.`);
    }
}

export class ResourceConflictError extends ConflictError {
    constructor(value: string) {
        super(`Resource=${value} already in exists.`);
    }
}

export class ResourceBadRequest extends BadRequestError {
    constructor() {
        super(`Resource invalid arguments.`);
    }
}