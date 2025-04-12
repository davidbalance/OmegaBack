import { Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

export class LoggerMiddleware implements NestMiddleware<Request, Response> {

    private readonly logger = new Logger();

    use(req: Request, res: Response, next: (error?: any) => void) {
        res.on('finish', () => {
            const statusCode = res.statusCode;
            if (400 <= statusCode && statusCode < 500) {
                this.logger.warn(`[${req.method}] ${req.url} - ${statusCode}`);
            }
            if (500 <= statusCode && statusCode <= 600) {
                this.logger.error(`[${req.method}][${req.ip}] ${req.url} - ${statusCode}`);
            }
        });
        next();
    }
}