import { QueryHandlerAsync } from "@shared/shared/application";
import { Option } from "@shared/shared/domain/option";
import { DoctorOptionRepository } from "../../repository/model.repositories";

export class DoctorFindOptionsQuery implements QueryHandlerAsync<undefined, Option[]> {
    constructor(
        private readonly repository: DoctorOptionRepository,
    ) { }

    async handleAsync(): Promise<Option[]> {
        const values = await this.repository.findManyAsync({ filter: [] });
        return values.map(e => e.toDomain());
    }
}