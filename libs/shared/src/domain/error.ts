export class BadRequestError extends Error { }

export class ConflictError extends Error { }

export class InternalError extends Error { }

export class StorageError extends Error { }

export class NotFoundError extends Error { }

export class UnauthorizedError extends Error { }

export class ForbiddenError extends Error { }

export class RepositoryError extends InternalError {
    constructor() {
        super(`There was an error on the repository.`);
    }
}

export type ErrorPayload = {
    statusCode: number;
    message: string;
}