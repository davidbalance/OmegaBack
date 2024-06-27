import { Inject, Injectable } from "@nestjs/common";
import { LogRepository } from "./log.repository";
import { Log } from "./entities/log.entity";
import { LoggerWritter } from "../interfaces/logger-writter.interface";
import { POSTLogRequestDto } from "./dtos/log.request.dto";
import { Between } from "typeorm";
import dayjs from "dayjs";

@Injectable()
export class LogService implements LoggerWritter {

    constructor(
        @Inject(LogRepository) private readonly repository: LogRepository
    ) { }

    async findLevels(): Promise<{ level: string }[]> {
        const levels = await this.repository.createQuery('log')
            .select('log.log_level', 'level')
            .distinct(true)
            .getRawMany<{ level: string }>();
        return levels;
    }

    async find(params: POSTLogRequestDto): Promise<Log[]> {
        const from = params.from || dayjs().subtract(1, 'day').toDate();
        const to = params.to || dayjs().toDate()
        return await this.repository.find({
            order: { timestamp: 'desc' },
            where: {
                timestamp: Between(from, to),
                level: params.level
            }
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