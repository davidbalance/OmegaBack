import { NotFoundError } from "@shared/shared/domain/error";

export class OrderNotFoundError extends NotFoundError {
    constructor(orderId: string) {
        super(`Order=${orderId} was not found.`);
    }
}