import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { DoctorRepository } from "../../repository/model.repositories";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";

export type DoctorFindManyQueryPayload = {
    filter?: string;
} & Required<Pagination> & Order<DoctorModel>
export class DoctorFindManyQuery implements QueryHandlerAsync<DoctorFindManyQueryPayload, PaginationResponse<DoctorModel>> {
    constructor(
        private readonly repository: DoctorRepository,
    ) { }

    async handleAsync(query: DoctorFindManyQueryPayload): Promise<PaginationResponse<DoctorModel>> {
        const filter: Filter<DoctorModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'userDni', operator: 'like', value: query.filter });
            filter.push({ field: 'userEmail', operator: 'like', value: query.filter });
            filter.push({ field: 'userName', operator: 'like', value: query.filter });
            filter.push({ field: 'userLastname', operator: 'like', value: query.filter });
        }
        const data = await this.repository.findManyAsync({
            ...query,
            filter: [{
                operator: "or",
                filter: filter
            }]
        });

        const amount = await this.repository.countAsync([{
            operator: "or",
            filter: filter
        }]);

        return { data, amount };
    }
}