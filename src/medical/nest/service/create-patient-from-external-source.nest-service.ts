import { Injectable, Provider } from "@nestjs/common";
import { PatientExternalSourceResolver } from "@omega/medical/application/resolver/patient-external-source.resolver";
import { InjectResolver } from "../inject/resolver.inject";
import { CreatePatientFromExternalSourceService } from "@omega/medical/application/service/create-patient-from-external-source.service";
import { CreatePatientFromExternalSourceServiceToken } from "../inject/service.inject";

@Injectable()
export class CreatePatientFromExternalSourceNestService
    extends CreatePatientFromExternalSourceService {
    constructor(
        @InjectResolver("PatientExternalSource") patientResolver: PatientExternalSourceResolver
    ) {
        super(patientResolver,);
    }
}

export const CreatePatientFromExternalSourceServiceProvider: Provider = {
    provide: CreatePatientFromExternalSourceServiceToken,
    useClass: CreatePatientFromExternalSourceNestService,
}