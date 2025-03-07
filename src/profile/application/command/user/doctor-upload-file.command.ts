import { DoctorNotFoundError } from "@omega/profile/core/domain/user/errors/doctor.errors";
import { UserNotFoundError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CommandHandlerAsync } from "@shared/shared/application";
import { FileOperation } from "@shared/shared/providers";
import { UserRepository } from "../../repository/aggregate.repositories";

export type DoctorUploadFileCommandPayload = {
    userId: string;
    buffer: Buffer;
}
export class DoctorUploadFileCommand implements CommandHandlerAsync<DoctorUploadFileCommandPayload, void> {
    constructor(
        private readonly repository: UserRepository,
        private readonly file: FileOperation
    ) { }

    async handleAsync(value: DoctorUploadFileCommandPayload): Promise<void> {
        const user = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.userId }] });
        if (!user) throw new UserNotFoundError(value.userId);

        if (!user.doctor) throw new DoctorNotFoundError(value.userId);

        await this.file.write(`signatures/${user.dni}`, `${user.dni}.png`, value.buffer);
        user.addFileToDoctor();
        await this.repository.saveAsync(user);
    }
}