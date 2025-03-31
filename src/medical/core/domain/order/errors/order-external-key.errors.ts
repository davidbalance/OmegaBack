import { ConflictError } from "@shared/shared/domain/error";

export class OrderExternalKeyConflictError extends ConflictError {
    constructor(owner: string, value: string) {
        super(`Order External Key=${owner}-${value} already exists.`);
    }
}