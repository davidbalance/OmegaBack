import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { DoctorModel } from "@omega/profile/core/model/user/doctor.model";
import { QueryHandlerAsync } from "@shared/shared/application";
import { DoctorRepository } from "../../repository/model.repositories";

export type DoctorFindOneByDniQueryPayload = {
    userDni: string;
}
export interface DoctorFindOneByDniQuery extends QueryHandlerAsync<DoctorFindOneByDniQueryPayload, DoctorModel> { }

export class DoctorFindOneByDniQueryImpl implements DoctorFindOneByDniQuery {
    constructor(
        private readonly repository: DoctorRepository,
    ) { }

    async handleAsync(value: DoctorFindOneByDniQueryPayload): Promise<DoctorModel> {
        const doctor = await this.repository.findOneAsync([{ field: 'userDni', operator: 'eq', value: value.userDni }]);
        if (!doctor) throw new DoctorNotFoundError(value.userDni);
        return doctor;
    }
}