import { Injectable, Provider } from "@nestjs/common";
import { PatientExternalNotificationDispatcher } from "@omega/medical/application/notification-dispatcher/patient-external.notification-dispatcher";
import { PatientExternalNotificationDispatcherToken } from "../inject/notification-dispatcher.inject";

@Injectable()
export class PatientExternalNestNotificationDispatcher implements PatientExternalNotificationDispatcher {
    constructor() { }

    async emitAsync(payload: { patientDni: string; patientName: string; patientLastname: string; patientEmail: string; patientGender: "male" | "female"; patientBirthday: Date; }): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export const PatientExternalNotificationDispatcherProvider: Provider = {
    provide: PatientExternalNotificationDispatcherToken,
    useClass: PatientExternalNestNotificationDispatcher
}