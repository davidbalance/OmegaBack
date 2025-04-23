import { QueryHandlerAsync } from "@shared/shared/application";
import { Filter, Order, Pagination } from "@shared/shared/domain";
import { ClientDoctorModel } from "@omega/medical/core/model/client/client-doctor.model";
import { PaginationResponse } from "@shared/shared/nest/pagination-response";
import { ClientDoctorRepository } from "../../repository/model.repositories";

export type ClientDoctorFindManyQueryPayload = {
    doctorDni: string;
    filter?: string;
} & Required<Pagination> & Order<ClientDoctorModel>;
export class ClientDoctorFindManyQuery implements QueryHandlerAsync<ClientDoctorFindManyQueryPayload, PaginationResponse<ClientDoctorModel>> {
    constructor(
        private readonly repository: ClientDoctorRepository
    ) { }

    async handleAsync(query: ClientDoctorFindManyQueryPayload): Promise<PaginationResponse<ClientDoctorModel>> {
        const filter: Filter<ClientDoctorModel>[] = [];
        if (query.filter) {
            filter.push({ field: 'patientDni', operator: 'like', value: query.filter });
            filter.push({ field: 'patientName', operator: 'like', value: query.filter });
            filter.push({ field: 'patientLastname', operator: 'like', value: query.filter });
        }
        const data = await this.repository.findManyAsync({
            ...query,
            filter: [
                { operator: 'or', filter: filter },
                { field: 'doctorDni', operator: 'eq', value: query.doctorDni }
            ],
        });

        const amount = await this.repository.countAsync([
            { operator: 'or', filter: filter },
            { field: 'doctorDni', operator: 'eq', value: query.doctorDni }
        ]);
        return { data, amount }

    }
}