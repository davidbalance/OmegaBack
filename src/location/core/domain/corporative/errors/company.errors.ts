import { BadRequestError, ConflictError, ForbiddenError, NotFoundError } from "@shared/shared/domain/error";

export class CompanyConflictError extends ConflictError {
    constructor(value: string) {
        super(`Company=${value} already exists.`);
    }
}

export class CompanyForbiddenError extends ForbiddenError {
    constructor(value: string) {
        super(`Company=${value} forbidden action.`);
    }
}

export class CompanyNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Company=${value} was not found.`);
    }
}

export class CompanyBadRequestError extends BadRequestError {
    constructor(value: string) {
        super(`Company=${value} is invalid.`);
    }
}