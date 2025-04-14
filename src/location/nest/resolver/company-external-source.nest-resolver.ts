import { Injectable, Provider } from "@nestjs/common";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { CompanyExternalSourceResolverToken } from "../inject/resolver.inject";
import { CompanyExternalKeyNotFoundError } from "@omega/location/core/domain/corporative/errors/company-external-key.errors";
import { CompanyExternalConnectionModel } from "@omega/location/core/models/corporative/company-external-connection.model";
import { CompanyExternalConnectionRepository } from "@omega/location/application/repository/model.repositories";
import { CompanyCreateFromExternalSourceCommand } from "@omega/location/application/command/corporative/company-create-from-external-source.command";
import { CompanyExternalSourceResolver } from "@omega/location/application/resolver/company-external-source.resolver";

@Injectable()
export class CompanyExternalSourceNestResolver implements CompanyExternalSourceResolver {
    constructor(
        @InjectModelRepository("CompanyExternalConnection") private readonly externalConnection: CompanyExternalConnectionRepository,
        @InjectCommand("CompanyCreateFromExternalSource") private readonly createCommand: CompanyCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; corporativeId: string; companyKey: string; companyName: string; companyRuc: string; companyAddress: string; companyPhone: string; }): Promise<CompanyExternalConnectionModel> {
        const filter: Filter<CompanyExternalConnectionModel>[] = [
            { field: 'companyExternalKey', operator: 'eq', value: value.companyKey },
            { field: 'companyExternalOwner', operator: 'eq', value: value.owner },
        ]
        let externalExam = await this.externalConnection.findOneAsync(filter);

        if (!externalExam) {
            await this.createCommand.handleAsync({
                externalKeyOwner: value.owner,
                externalKeyValue: value.companyKey,
                address: value.companyAddress,
                corporativeId: value.corporativeId,
                name: value.companyName,
                phone: value.companyPhone,
                ruc: value.companyRuc
            });
            externalExam = await this.externalConnection.findOneAsync(filter);
            if (!externalExam) throw new CompanyExternalKeyNotFoundError(value.owner, value.companyKey);
        }
        return externalExam;
    }
}

export const CompanyExternalSourceResolverProvider: Provider = {
    provide: CompanyExternalSourceResolverToken,
    useClass: CompanyExternalSourceNestResolver
}