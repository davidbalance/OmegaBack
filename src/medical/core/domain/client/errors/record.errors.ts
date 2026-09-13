import { NotFoundError } from "@shared/shared/domain/error";

export class RecordNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Record=${value} was not found.`);
    }
}

export class RecordInvalidRecordTemplate extends NotFoundError {
    constructor(value: string) {
        super(`Invalid record template: ${value}`);
    }
}