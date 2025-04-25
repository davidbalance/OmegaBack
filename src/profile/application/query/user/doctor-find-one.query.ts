import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { DoctorRepository } from "../../repository/model.repositories";

export type DoctorFindOneQueryPayload = {
    userId: string;
}
export interface DoctorFindOneQuery extends QueryHandlerAsync<DoctorFindOneQueryPayload, DoctorModel> { }

export class DoctorFindOneQueryImpl implements DoctorFindOneQuery {
    constructor(
        private readonly repository: DoctorRepository,
    ) { }

    async handleAsync(value: DoctorFindOneQueryPayload): Promise<DoctorModel> {
        const doctor = await this.repository.findOneAsync([{ field: 'userId', operator: 'eq', value: value.userId }]);
        if (!doctor) throw new DoctorNotFoundError(value.userId);
        return doctor;
    }
}