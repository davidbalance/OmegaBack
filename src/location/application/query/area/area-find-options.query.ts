import { QueryHandlerAsync } from "@shared/shared/application";
import { Option } from "@shared/shared/domain/option";
import { AreaOptionRepository } from "../../repository/model.repositories";

export class AreaFindOptionsQuery implements QueryHandlerAsync<undefined, Option[]> {
    constructor(
        private readonly repository: AreaOptionRepository
    ) { }

    async handleAsync(): Promise<Option[]> {
        const values = await this.repository.findManyAsync({ filter: [] });
        return values.map(e => e.toOption());
    }
}