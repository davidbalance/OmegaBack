import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { OrderDoctorModel } from "@omega/medical/core/model/order/order-doctor.model";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";
import { OrderDoctorRepository } from "../../repository/model.repositories";

export type OrderDoctorFindManyQueryPayload = {
    patientDni: string;
    doctorDni: string;
    filter?: string;
} & Required<Pagination> & Order<OrderDoctorModel>;

export interface OrderDoctorFindManyQuery extends QueryHandlerAsync<OrderDoctorFindManyQueryPayload, PaginationResponse<OrderDoctorModel>> { }

export class OrderDoctorFindManyQueryImpl implements OrderDoctorFindManyQuery {
    constructor(
        private readonly repository: OrderDoctorRepository
    ) { }

    async handleAsync(query: OrderDoctorFindManyQueryPayload): Promise<PaginationResponse<OrderDoctorModel>> {
        const filter: Filter<OrderDoctorModel>[] = [];
        if (query.filter) {
            filter.push(
                { field: 'orderProcess', operator: 'like', value: query.filter }
            );
        }
        const data = await this.repository.findManyAsync({
            ...query,
            filter: [
                { operator: 'or', filter: filter },
                { field: 'patientDni', operator: 'eq', value: query.patientDni },
                { field: 'doctorDni', operator: 'eq', value: query.doctorDni },
            ]
        });

        const amount = await this.repository.countAsync([
            { operator: 'or', filter: filter },
            { field: 'patientDni', operator: 'eq', value: query.patientDni },
            { field: 'doctorDni', operator: 'eq', value: query.doctorDni },
        ]);

        return { data, amount };
    }

}