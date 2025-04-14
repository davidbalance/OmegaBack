import { Injectable, Provider } from "@nestjs/common";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { OrderExternalSourceResolver } from "@omega/medical/application/resolver/order-external-source.resolver";
import { OrderExternalConnectionRepository } from "@omega/medical/application/repository/model.repositories";
import { OrderCreateFromExternalSourceCommand } from "@omega/medical/application/commands/order/order-create-from-external-source.command";
import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalKeyNotFoundError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";
import { OrderExternalSourceResolverToken } from "../inject/resolver.inject";

@Injectable()
export class OrderExternalSourceNestResolver implements OrderExternalSourceResolver {
    constructor(
        @InjectModelRepository("OrderExternalConnection") private readonly externalConnection: OrderExternalConnectionRepository,
        @InjectCommand("OrderCreateFromExternalSource") private readonly createCommand: OrderCreateFromExternalSourceCommand
    ) { }

    async resolve(value: { owner: string; patientDni: string; corporativeName: string; companyRuc: string; companyName: string; branchName: string; doctorDni: string; doctorFullname: string; orderKey: string; orderProcess: string; orderYear: number; }): Promise<OrderExternalConnectionModel> {
        const filter: Filter<OrderExternalConnectionModel>[] = [
            { field: 'orderExternalKey', operator: 'eq', value: value.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: value.owner },
        ]
        let externalOrder = await this.externalConnection.findOneAsync(filter);

        if (!externalOrder) {
            await this.createCommand.handleAsync({
                ...value,
                process: value.orderProcess,
                year: value.orderYear,
                externalKeyOwner: value.owner,
                externalKeyValue: value.orderKey,
            });
            externalOrder = await this.externalConnection.findOneAsync(filter);
            if (!externalOrder) throw new OrderExternalKeyNotFoundError(value.owner, value.orderKey);
        }
        return externalOrder;
    }

}

export const OrderExternalSourceResolverProvider: Provider = {
    provide: OrderExternalSourceResolverToken,
    useClass: OrderExternalSourceNestResolver
}