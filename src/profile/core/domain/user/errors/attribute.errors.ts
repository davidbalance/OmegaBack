import { NotFoundError } from "@shared/shared/domain/error";

export class AttributeNotFoundError extends NotFoundError {
    constructor(value: string) {
        super(`Attribute=${value} not found.`);
    }
}