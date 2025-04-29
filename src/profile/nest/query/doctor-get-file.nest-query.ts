import { Injectable, Provider } from "@nestjs/common";
import { DoctorRepository } from "@omega/profile/application/repository/model.repositories";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { DoctorGetFileQueryToken } from "../inject/query.inject";
import { DoctorGetFileQueryImpl } from "@omega/profile/application/query/user/doctor-get-file.query";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";

@Injectable()
class DoctorGetFileNestQuery extends DoctorGetFileQueryImpl {
    constructor(
        @InjectModelRepository("Doctor") repository: DoctorRepository,
        @InjectFile() file: FileOperation
    ) {
        super(repository, file);
    }
}

export const DoctorGetFileQueryProvider: Provider = {
    provide: DoctorGetFileQueryToken,
    useClass: DoctorGetFileNestQuery
}