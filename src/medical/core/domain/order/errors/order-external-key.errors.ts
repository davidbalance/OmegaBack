import { ConflictError } from "@shared/shared/domain/error";
import { NotFoundError } from "rxjs";

export class OrderExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Order External Key=${owner}-${value} already exists.`);
    }
}

export class OrderExternalKeyNotFoundError extends NotFoundError {
    constructor(owner: string, value: string) {
        super(`Order External Key=${owner}-${value} not found.`);
    }
}