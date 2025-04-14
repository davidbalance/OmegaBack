import { Injectable, Logger, Provider } from "@nestjs/common";
import { ClientCreateCommandPayload } from "@omega/medical/application/commands/client/client-create.command";
import { PatientCreateNotifyToken } from "@omega/medical/nest/inject/notify.inject";
import { PatientCreateCommand } from "@omega/profile/application/command/user/patient-create.command";
import { InjectCommand } from "@omega/profile/nest/inject/command.inject";
import { NotificationProvider } from "@shared/shared/providers/notification.provider";

@Injectable()
export class PatientCreateNotifyService implements NotificationProvider<ClientCreateCommandPayload> {
    constructor(
        @InjectCommand('PatientCreate') private readonly createPatientCommand: PatientCreateCommand
    ) { }

    async emitAsync(payload: ClientCreateCommandPayload): Promise<void> {
        try {
            await this.createPatientCommand.handleAsync({
                name: payload.patientName,
                lastname: payload.patientLastname,
                dni: payload.patientDni,
                birthday: payload.patientBirthday,
                gender: payload.patientGender,
                email: payload.patientEmail
            })
        } catch (error) {
            Logger.error(error);
        }
    }
}

export const PatientCreateNotifyProvider: Provider = {
    provide: PatientCreateNotifyToken,
    useClass: PatientCreateNotifyService
}