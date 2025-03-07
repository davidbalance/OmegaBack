import { QueryHandlerAsync } from "@shared/shared/application";
import { LogoRepository } from "../../repository/logo/model.repositories";
import { LogoModel } from "@omega/auth/core/model/logo/logo.model";

export class LogoFindManyQuery implements QueryHandlerAsync<undefined, LogoModel[]> {
    constructor(
        private readonly repository: LogoRepository
    ) { }

    async handleAsync(): Promise<LogoModel[]> {
        return this.repository.findManyAsync({ filter: [] });
    }
}