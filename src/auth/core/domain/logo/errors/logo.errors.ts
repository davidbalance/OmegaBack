import { ConflictError } from "@shared/shared/domain/error";

export class LogoConflictError extends ConflictError {
    constructor(value: string) {
        super(`Logo=${value} already exists`);
    }
}