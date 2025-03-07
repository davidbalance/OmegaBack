import { NotFoundError } from "@shared/shared/domain/error";

export class RecordNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Record=${value} was not found.`);
    }
}