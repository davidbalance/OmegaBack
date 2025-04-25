
import { QueryHandlerAsync } from "@shared/shared/application";
import { Option } from "@shared/shared/domain/option";
import { ManagementOptionRepository } from "../../repository/model.repositories";

export interface ManagementFindOptionsQuery extends QueryHandlerAsync<undefined, Option[]> {
    handleAsync(): Promise<Option[]>;
}

export class ManagementFindOptionsQueryImpl implements ManagementFindOptionsQuery {
    constructor(
        private readonly repository: ManagementOptionRepository
    ) { }

    async handleAsync(): Promise<Option[]> {
        const values = await this.repository.findManyAsync({ filter: [] });
        return values.map(e => e.toOption());
    }
}