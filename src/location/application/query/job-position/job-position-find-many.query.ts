import { JobPositionModel } from "@omega/location/core/models/jobPosition/job-position.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { JobPositionRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination_response";

export type JobPositionFindManyQueryPayload = {
    filter?: string;
} & Order<JobPositionModel> & Required<Pagination>;
export class JobPositionFindManyQuery implements QueryHandlerAsync<JobPositionFindManyQueryPayload, PaginationResponse<JobPositionModel>> {
    constructor(
        private readonly repository: JobPositionRepository
    ) { }

    async handleAsync(query: JobPositionFindManyQueryPayload): Promise<PaginationResponse<JobPositionModel>> {
        const filter: Filter<JobPositionModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'jobPositionName', operator: 'like', value: query.filter });
        }
        const data = await this.repository.findManyAsync({ ...query, filter: filter });
        const amount = await this.repository.countAsync(filter);
        return { data, amount };
    }
}