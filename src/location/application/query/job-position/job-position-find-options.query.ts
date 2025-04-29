import { QueryHandlerAsync } from "@shared/shared/application";
import { Option } from "@shared/shared/domain/option";
import { JobPositionOptionRepository } from "../../repository/model.repositories";

export interface JobPositionFindOptionsQuery extends QueryHandlerAsync<undefined, Option[]> {
    handleAsync(): Promise<Option[]>;
}

export class JobPositionFindOptionsQueryImpl implements JobPositionFindOptionsQuery {
    constructor(
        private readonly repository: JobPositionOptionRepository
    ) { }

    async handleAsync(): Promise<Option[]> {
        const value = await this.repository.findManyAsync({ filter: [] });
        return value.map(e => e.toOption());
    }
}