import { QueryHandlerAsync } from "@shared/shared/application";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { CorporativeExternalConnectionRepository, CorporativeRepository } from "../../repository/model.repositories";
import { CorporativeModel } from "@omega/location/core/models/corporative/corporative.model";
import { CorporativeNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative.errors";
import { CorporativeExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/corporative-external-key.errors";

export type CorporativeFindOneByExternalKeyQueryPayload = ExternalKeyProps;
export interface CorporativeFindOneByExternalKeyQuery extends QueryHandlerAsync<CorporativeFindOneByExternalKeyQueryPayload, CorporativeModel> { }

export class CorporativeFindOneByExternalKeyQueryImpl implements CorporativeFindOneByExternalKeyQuery {
    constructor(
        private readonly externalConnectionRepository: CorporativeExternalConnectionRepository,
        private readonly modelRepository: CorporativeRepository
    ) { }

    async handleAsync(query: CorporativeFindOneByExternalKeyQueryPayload): Promise<CorporativeModel> {
        const value = await this.externalConnectionRepository.findOneAsync([
            { field: 'corporativeExternalOwner', operator: 'eq', value: query.owner },
            { field: 'corporativeExternalKey', operator: 'eq', value: query.value },
        ]);

        if (!value) throw new CorporativeExternalKeyNotFoundError(query.owner, query.value);

        const corporative = await this.modelRepository.findOneAsync([{ field: 'corporativeId', operator: 'eq', value: value.corporativeId }]);
        if (!corporative) throw new CorporativeNotFoundError(value.corporativeId);

        return corporative;
    }
}