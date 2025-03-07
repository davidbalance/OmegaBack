import { Injectable, Provider } from "@nestjs/common";
import { OrderPatientFindManyQuery } from "@omega/medical/application/queries/order/order-patient.find-many.query";
import { OrderPatientRepository } from "@omega/medical/application/repository/model.repositories";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderPatientFindManyQueryToken } from "../../inject/query.inject";

@Injectable()
class OrderPatientFindManyNestQuery extends OrderPatientFindManyQuery {
    constructor(
        @InjectModelRepository("OrderPatient") repository: OrderPatientRepository
    ) {
        super(repository);
    }
}

export const OrderPatientFindManyQueryProvider: Provider = {
    provide: OrderPatientFindManyQueryToken,
    useClass: OrderPatientFindManyNestQuery
}