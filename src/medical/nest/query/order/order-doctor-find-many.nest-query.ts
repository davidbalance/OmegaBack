import { Injectable, Provider } from "@nestjs/common";
import { OrderDoctorFindManyQuery } from "@omega/medical/application/queries/order/order-doctor-find-many.query";
import { InjectModelRepository } from "../../inject/model-repository.inject";
import { OrderDoctorFindManyQueryToken } from "../../inject/query.inject";
import { OrderDoctorRepository } from "@omega/medical/application/repository/model.repositories";

@Injectable()
class OrderDoctorFindManyNestQuery extends OrderDoctorFindManyQuery {
    constructor(
        @InjectModelRepository("OrderDoctor") repository: OrderDoctorRepository
    ) {
        super(repository);
    }
}

export const OrderDoctorFindManyQueryProvider: Provider = {
    provide: OrderDoctorFindManyQueryToken,
    useClass: OrderDoctorFindManyNestQuery
}