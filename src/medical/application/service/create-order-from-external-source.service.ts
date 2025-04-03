import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { OrderExternalConnectionRepository } from "../repository/model.repositories";
import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { Filter } from "@shared/shared/domain";
import { PatientExternalSourceResolver, PatientExternalSourceResolverPayload } from "../resolver/patient-external-source.resolver";
import { OrderExternalSourceResolver, OrderExternalSourceResolverPayload } from "../resolver/order-external-source.resolver";

export type CreateOrderFromExternalSourcePayload = CreateFromExternalSourcePayload & PatientExternalSourceResolverPayload & OrderExternalSourceResolverPayload;
export class CreateOrderFromExternalSourceService
    implements CreateFromExternalSource<CreateOrderFromExternalSourcePayload, OrderExternalConnectionModel> {
    constructor(
        private readonly externalConnection: OrderExternalConnectionRepository,
        private readonly patientResolver: PatientExternalSourceResolver,
        private readonly orderResolver: OrderExternalSourceResolver,
    ) { }

    async createAsync(value: CreateOrderFromExternalSourcePayload): Promise<OrderExternalConnectionModel> {
        const filter: Filter<OrderExternalConnectionModel>[] = [
            { field: 'orderExternalKey', operator: 'eq', value: value.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: value.owner },
        ]

        let externalOrder = await this.externalConnection.findOneAsync(filter);
        if (externalOrder) {
            return externalOrder;
        }

        const externalPatient = await this.patientResolver.resolve({ ...value });
        return await this.orderResolver.resolve({ ...value, patientDni: externalPatient.patientDni });
    }
}