import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { PatientExternalSourceResolver, PatientExternalSourceResolverPayload } from "../resolver/patient-external-source.resolver";
import { ClientModel } from "@omega/medical/core/model/client/client.model";

export type CreatePatientFromExternalSourcePayload = CreateFromExternalSourcePayload & PatientExternalSourceResolverPayload;
export class CreatePatientFromExternalSourceService
    implements CreateFromExternalSource<CreatePatientFromExternalSourcePayload, ClientModel> {
    constructor(
        private readonly patientResolver: PatientExternalSourceResolver,
    ) { }

    async createAsync(value: CreatePatientFromExternalSourcePayload): Promise<ClientModel> {
        return await this.patientResolver.resolve(value);
    }
}