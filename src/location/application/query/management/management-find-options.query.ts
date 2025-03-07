
import { QueryHandlerAsync } from "@shared/shared/application";
import { Option } from "@shared/shared/domain/option";
import { ManagementOptionRepository } from "../../repository/model.repositories";

export class ManagementFindOptionsQuery implements QueryHandlerAsync<undefined, Option[]> {
    constructor(
        private readonly repository: ManagementOptionRepository
    ) { }

    async handleAsync(): Promise<Option[]> {
        const values = await this.repository.findManyAsync({ filter: [] });
        return values.map(e => e.toOption());
    }
}