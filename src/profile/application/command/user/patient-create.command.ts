import { AddPatientToUserPayload, CreateUserPayload } from "@omega/profile/core/domain/user/payloads/user.payload";
import { User } from "@omega/profile/core/domain/user/user.domain";
import { CommandHandlerAsync } from "@shared/shared/application";
import { UserRepository } from "../../repository/aggregate.repositories";

export type PatientCreateCommandPayload = CreateUserPayload & AddPatientToUserPayload;
export interface PatientCreateCommand extends CommandHandlerAsync<PatientCreateCommandPayload, void> { }

export class PatientCreateCommandImpl implements PatientCreateCommand {
    constructor(
        private readonly repository: UserRepository
    ) { }

    async handleAsync(value: PatientCreateCommandPayload): Promise<void> {
        let user = await this.repository.findOneAsync({ filter: [{ field: 'dni', operator: 'eq', value: value.dni }] });
        if (!user) {
            user = User.create(value);
        }
        user.addPatient(value);
        await this.repository.saveAsync(user);
    }
}