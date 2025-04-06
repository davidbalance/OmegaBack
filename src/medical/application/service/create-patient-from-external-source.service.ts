import { CreateFromExternalSource, CreateFromExternalSourcePayload } from "@shared/shared/application/from-external-source.interface";
import { PatientExternalSourceResolver, PatientExternalSourceResolverPayload } from "../resolver/patient-external-source.resolver";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { PatientExternalNotificationDispatcher } from "../notification-dispatcher/patient-external.notification-dispatcher";

export type CreatePatientFromExternalSourcePayload = CreateFromExternalSourcePayload & PatientExternalSourceResolverPayload;
export class CreatePatientFromExternalSourceService
    implements CreateFromExternalSource<CreatePatientFromExternalSourcePayload, ClientModel> {
    constructor(
        private readonly patientResolver: PatientExternalSourceResolver,
        private readonly notificationDispatcher: PatientExternalNotificationDispatcher
    ) { }

    async createAsync(value: CreatePatientFromExternalSourcePayload): Promise<ClientModel> {
        const externalPatient = await this.patientResolver.resolve(value);
        this.notificationDispatcher.emitAsync({ ...value })
        return externalPatient;
    }
}