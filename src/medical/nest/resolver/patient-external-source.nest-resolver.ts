import { Injectable, Provider } from "@nestjs/common";
import { Filter } from "@shared/shared/domain";
import { InjectModelRepository } from "../inject/model-repository.inject";
import { InjectCommand } from "../inject/command.inject";
import { ClientCreateCommand } from "@omega/medical/application/commands/client/client-create.command";
import { PatientExternalSourceResolver } from "@omega/medical/application/resolver/patient-external-source.resolver";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { ClientRepository } from "@omega/medical/application/repository/model.repositories";
import { ClientNotFoundError } from "@omega/medical/core/domain/client/errors/client.errors";
import { PatientExternalSourceResolverToken } from "../inject/resolver.inject";

@Injectable()
export class PatientExternalSourceNestResolver implements PatientExternalSourceResolver {
    constructor(
        @InjectModelRepository("Client") private readonly externalConnection: ClientRepository,
        @InjectCommand("ClientCreate") private readonly createCommand: ClientCreateCommand
    ) { }

    async resolve(value: { patientDni: string; patientName: string; patientLastname: string; patientEmail: string; patientGender: "male" | "female"; patientBirthday: Date; }): Promise<ClientModel> {
        const filter: Filter<ClientModel>[] = [
            { field: 'patientDni', operator: 'eq', value: value.patientDni },
        ]
        let medicalClient = await this.externalConnection.findOneAsync(filter);

        if (!medicalClient) {
            await this.createCommand.handleAsync({
                patientDni: value.patientDni,
                patientName: value.patientName,
                patientLastname: value.patientLastname,
                patientGender: value.patientGender,
                patientBirthday: value.patientBirthday,
                patientEmail: value.patientEmail,
            });
            medicalClient = await this.externalConnection.findOneAsync(filter);
            if (!medicalClient) throw new ClientNotFoundError(value.patientDni);
        }
        return medicalClient;
    }
}

export const PatientExternalSourceResolverProvider: Provider = {
    provide: PatientExternalSourceResolverToken,
    useClass: PatientExternalSourceNestResolver
}