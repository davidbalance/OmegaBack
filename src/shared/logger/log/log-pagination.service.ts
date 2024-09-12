import { Inject, Injectable } from "@nestjs/common";
import { LogRepository } from "./log.repository";
import { LogEntity } from "./entities/log.entity";
import { Brackets, SelectQueryBuilder } from "typeorm";
import { BasePaginationService } from "@/shared/utils/bases/base.pagination.service";

@Injectable()
export class LogPaginationService extends BasePaginationService<LogEntity, LogEntity> {

    constructor(
        @Inject(LogRepository) private readonly repository: LogRepository
    ) { super(); }

    protected queryBuilder(filter: string, extras: { level?: string, fromDate?: Date, toDate?: Date }): SelectQueryBuilder<LogEntity> {
        const query = this.repository.query('logs')
            .select('logs.id', 'id')
            .addSelect('logs.level', 'level')
            .addSelect('logs.message', 'message')
            .addSelect('logs.timestamp', 'timestamp')
            .where('1');
        if (extras.level) {
            query.andWhere('logs.level LIKE :level', { level: extras.level })
        }
        if (extras.fromDate && extras.toDate) {
            query
                .andWhere(new Brackets(qr =>
                    qr.where('logs.timestamp >= :after', { after: extras.fromDate })
                        .andWhere('logs.timestamp < :before', { before: extras.toDate })
                ))
        }

        query.orderBy('logs.timestamp', 'DESC');
        return query;
    }

}