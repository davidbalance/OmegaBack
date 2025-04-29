import { UserConflictError } from "@omega/profile/core/domain/user/errors/user.errors";
import { CreateUserPayload } from "@omega/profile/core/domain/user/payloads/user.payload";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";

export type DoctorCreateCommandPayload = CreateUserPayload;
export interface DoctorCreateCommand extends CommandHandlerAsync<DoctorCreateCommandPayload, void> { }

export class DoctorCreateCommandImpl implements DoctorCreateCommand {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(value: DoctorCreateCommandPayload): Promise<void> {
        const exists = await this.repository.findOneAsync({ filter: [{ field: 'dni', operator: 'eq', value: value.dni }] });
        if (exists) throw new UserConflictError(value.dni);

        const user = User.create(value);
        user.addDoctor();
        await this.repository.saveAsync(user);
    }
}