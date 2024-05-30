import { Inject, Injectable } from "@nestjs/common";
import { LogRepository } from "./log.repository";
import { Log } from "./entities/log.entity";
import { LoggerWritter } from "../interfaces/logger-writter.interface";

@Injectable()
export class LogService implements LoggerWritter {

    constructor(
        @Inject(LogRepository) private readonly repository: LogRepository
    ) { }

    async find(): Promise<Log[]> {
        return await this.repository.find({
            order: { timestamp: 'desc' },
            take: 20
        });
    }

    async write(info: any): Promise<void> {
        await this.repository.create({
            level: info.level.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, ''),
            message: info.message.replace(/\x1B\[[0-?]*[ -/]*[@-~]/g, '').trimStart(),
            timestamp: info.timestamp
        });
    }
}