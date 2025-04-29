import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { QueryHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { DoctorRepository } from "../../repository/model.repositories";

export type DoctorGetFileQueryPayload = {
    userId: string;
}
export interface DoctorGetFileQuery extends QueryHandlerAsync<DoctorGetFileQueryPayload, Buffer> { }

export class DoctorGetFileQueryImpl implements DoctorGetFileQuery {
    constructor(
        private readonly repository: DoctorRepository,
        private readonly file: FileOperation
    ) { }

    async handleAsync(value: DoctorGetFileQueryPayload): Promise<Buffer> {
        const doctor = await this.repository.findOneAsync([{ field: 'userId', operator: 'eq', value: value.userId }]);
        if (!doctor) throw new DoctorNotFoundError(value.userId);
        const buffer = await this.file.read(doctor.doctorSignature)
        return buffer;
    }
}