import { QueryHandlerAsync } from "@shared/shared/application";
import { Option } from "@shared/shared/domain/option";
import { JobPositionOptionRepository } from "../../repository/model.repositories";

export class JobPositionFindOptionsQuery implements QueryHandlerAsync<undefined, Option[]> {
    constructor(
        private readonly repository: JobPositionOptionRepository
    ) { }

    async handleAsync(): Promise<Option[]> {
        const value = await this.repository.findManyAsync({ filter: [] });
        return value.map(e => e.toOption());
    }
}