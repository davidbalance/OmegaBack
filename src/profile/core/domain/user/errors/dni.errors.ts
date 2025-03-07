import { BadRequestError } from "@shared/shared/domain/error";

export class DniInvalidValueError extends BadRequestError {
    constructor(dni: string) {
        super(`Dni=${dni} is not valid.`);
    }
}