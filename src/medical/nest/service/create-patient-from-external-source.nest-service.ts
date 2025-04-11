import { Injectable, Provider } from "@nestjs/common";
import { PatientExternalSourceResolver } from "@omega/medical/application/resolver/patient-external-source.resolver";
import { InjectResolver } from "../inject/resolver.inject";
import { CreatePatientFromExternalSourceService } from "@omega/medical/application/service/create-patient-from-external-source.service";
import { CreatePatientFromExternalSourceServiceToken } from "../inject/service.inject";
import { InjectNotificationDispatcher } from "../inject/notification-dispatcher.inject";
import { PatientExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/patient-external.notification-dispatcher";

@Injectable()
export class CreatePatientFromExternalSourceNestService
    extends CreatePatientFromExternalSourceService {
    constructor(
        @InjectResolver("PatientExternalSource") patientResolver: PatientExternalSourceResolver,
        @InjectNotificationDispatcher("PatientExternal") notificationDispatcher: PatientExternalNotificationDispatcher
    ) {
        super(patientResolver, notificationDispatcher);
    }
}

export const CreatePatientFromExternalSourceServiceProvider: Provider = {
    provide: CreatePatientFromExternalSourceServiceToken,
    useClass: CreatePatientFromExternalSourceNestService,
}