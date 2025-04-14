import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { CorporativeExternalSourceResolver, CorporativeExternalSourceResolverPayload } from "../resolver/corporative-external-source.resolver";
import { CorporativeExternalConnectionModel } from "@omega/location/core/models/corporative/corporative-external-connection.model";

export type CreateCorporativeFromExternalSourcePayload = CreateFromExternalSourcePayload & CorporativeExternalSourceResolverPayload;
export class CreateCorporativeFromExternalSourceService
    implements CreateFromExternalSource<CreateCorporativeFromExternalSourcePayload, CorporativeExternalConnectionModel> {
    constructor(
        private readonly corporativeResolver: CorporativeExternalSourceResolver,
    ) { }

    async createAsync(value: CreateCorporativeFromExternalSourcePayload): Promise<CorporativeExternalConnectionModel> {
        return await this.corporativeResolver.resolve(value);
    }
}