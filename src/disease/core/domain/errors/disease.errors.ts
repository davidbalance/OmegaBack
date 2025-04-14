import { ConflictError, NotFoundError } from "@shared/shared/domain/error";

export class DiseaseConflictError extends ConflictError {
    constructor(value: {
        groupId: string;
        disease: string;
    }) {
        super(`Disease=${value.disease} already exists in group=${value.groupId}`);
    }
}

export class DiseaseNotFoundError extends NotFoundError {
    constructor(diseaseId: string) {
        super(`Disease=${diseaseId} not found.`);
    }
}