import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { BadRequestError, ConflictError, ErrorPayload, ForbiddenError, InternalError, NotFoundError, StorageError, UnauthorizedError } from "@shared/shared/domain/error";
import { Response } from "express";

@Catch(
    ConflictError,
    BadRequestError,
    InternalError,
    StorageError,
    NotFoundError,
    UnauthorizedError,
    ForbiddenError
)
export class DomainErrorFilter implements ExceptionFilter {
    catch(exception: Error, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const message: string = exception.message;
        let status = HttpStatus.INTERNAL_SERVER_ERROR;

        if (exception instanceof ConflictError) {
            status = HttpStatus.CONFLICT;
        }
        else if (exception instanceof StorageError) {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        else if (exception instanceof NotFoundError) {
            status = HttpStatus.NOT_FOUND;
        }
        else if (exception instanceof UnauthorizedError) {
            status = HttpStatus.UNAUTHORIZED;
        }
        else if (exception instanceof ForbiddenError) {
            status = HttpStatus.FORBIDDEN;
        }
        else if (exception instanceof BadRequestError) {
            status = HttpStatus.BAD_REQUEST;
        }

        response.status(status)
            .json({
                statusCode: status,
                message: message
            } satisfies ErrorPayload)
    }
}