import { LoggerModel } from "@db-logger/db-logger/core/model/logger.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, FilterGroup, Pagination } from "@shared/shared/domain";
import { LoggerRepository } from "../repository/logger.repository";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type ReadLoggerQueryPayload = {
    level?: string;
} & Required<Pagination>;
export class ReadLoggerQuery implements QueryHandlerAsync<ReadLoggerQueryPayload, PaginationResponse<LoggerModel>> {

    constructor(
        private readonly repository: LoggerRepository
    ) { }

    async handleAsync(query: ReadLoggerQueryPayload): Promise<PaginationResponse<LoggerModel>> {
        const filter: (FilterGroup<LoggerModel> | Filter<LoggerModel>)[] = [];
        if (query.level) {
            filter.push({ field: 'level', operator: 'eq', value: query.level });
        }
        const data = await this.repository.read({ ...query, filter: filter });
        const amount = await this.repository.countAsync(filter);

        return { data, amount };
    }
}