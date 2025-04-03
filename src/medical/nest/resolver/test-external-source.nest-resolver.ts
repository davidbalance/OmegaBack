import { Injectable, Provider } from "@nestjs/common";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { TestExternalSourceResolver } from "@omega/medical/application/resolver/test-external-source.resolver";
import { TestExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { TestCreateFromExternalSourceCommand } from "@omega/medical/application/commands/test/test-create-from-external-source.command";
import { TestExternalSourceResolverToken } from "../inject/resolver.inject";
import { TestExternalKeyNotFoundError } from "@omega/medical/core/domain/test/errors/test-external-key.errors";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection";

@Injectable()
export class TestExternalSourceNestResolver implements TestExternalSourceResolver {
    constructor(
        @InjectModelRepository("TestExternalConnection") private readonly externalConnection: TestExternalConnectionRepository,
        @InjectCommand("TestCreateFromExternalSource") private readonly createCommand: TestCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; testKey: string; examName: string; examSubtype: string; examType: string; orderId: string; }): Promise<TestExternalConnectionModel> {
        const filter: Filter<TestExternalConnectionModel>[] = [
            { field: 'testExternalKey', operator: 'eq', value: value.testKey },
            { field: 'testExternalOwner', operator: 'eq', value: value.owner },
        ]
        let externalTest = await this.externalConnection.findOneAsync(filter);

        if (!externalTest) {
            await this.createCommand.handleAsync({
                ...value,
                externalKeyOwner: value.owner,
                externalKeyValue: value.testKey,
            });
            externalTest = await this.externalConnection.findOneAsync(filter);
            if (!externalTest) throw new TestExternalKeyNotFoundError(value.owner, value.testKey);
        }
        return externalTest;
    }
}

export const TestExternalSourceResolverProvider: Provider = {
    provide: TestExternalSourceResolverToken,
    useClass: TestExternalSourceNestResolver
}