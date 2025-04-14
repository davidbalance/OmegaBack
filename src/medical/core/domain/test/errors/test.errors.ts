import { BadRequestError, ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class TestNotFoundError extends NotFoundError {
    constructor(testId: string) {
        super(`Test=${testId} not found.`);
    }
}

export class TestConflictError extends ConflictError {
    constructor() {
        super(`Already exists this test.`);
    }
}

export class TestInvalidError extends BadRequestError {
    constructor(value: string) {
        super(`Invalid request for Test=${value}.`)
    }
}