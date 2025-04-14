import { ConflictError, ForbiddenError, NotFoundError } from "@shared/shared/domain/error";

export class DiseaseGroupNotFoundError extends NotFoundError {
    constructor(groupId: string) {
        super(`Disease group=${groupId} not found.`);
    }
}

export class DiseaseGroupConflictError extends ConflictError {
    constructor(groupName: string) {
        super(`Disease group=${groupName} already exists.`);
    }
}

export class DiseaseGroupForbiddenError extends ForbiddenError {
    constructor(groupName: string, msg?: string) {
        super(`Disease group=${groupName} have a diseases so cannot procced with the action. ${msg}`);
    }
}