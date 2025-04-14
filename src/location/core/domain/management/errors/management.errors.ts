import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class ManagementConflictError extends ConflictError {
    constructor(managementName: string) {
        super(`Management=${managementName} already exists.`);
    }
}

export class ManagementNotFoundError extends NotFoundError {
    constructor(managementId: string) {
        super(`Management=${managementId} was not found.`);
    }
}