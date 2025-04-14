import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "@shared/shared/domain/error";

export class CorporativeNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Corporative=${value} was not found.`);
    }
}

export class CorporativeConflictError extends ConflictError {
    constructor(value: string) {
        super(`Corporative=${value} already exists.`);
    }
}

export class CorporativeForbiddenError extends ForbiddenError {
    constructor(value: string) {
        super(`Corporative=${value} forbidden action.`);
    }
}

export class CorporativeInvalidError extends BadRequestError {
    constructor(action: string) {
        super(`Corporative invalid action=${action}.`);
    }
}