import { Injectable, Provider } from "@nestjs/common";
import { DoctorUploadFileCommandImpl } from "@omega/profile/application/command/user/doctor-upload-file.command";
import { UserRepository } from "@omega/profile/application/repository/aggregate.repositories";
import { InjectAggregateRepository } from "../inject/aggregate-repository.inject";
import { DoctorUploadFileCommandToken } from "../inject/command.inject";
import { InjectFile } from "@shared/shared/nest/inject";
import { FileOperation } from "@shared/shared/providers";

@Injectable()
class DoctorUploadFileNestCommand extends DoctorUploadFileCommandImpl {
    constructor(
        @InjectAggregateRepository("User") repository: UserRepository,
        @InjectFile() file: FileOperation
    ) {
        super(repository, file);
    }
}

export const DoctorUploadFileCommandProvider: Provider = {
    provide: DoctorUploadFileCommandToken,
    useClass: DoctorUploadFileNestCommand
}