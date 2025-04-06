import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { PatientExternalSourceResolver } from "../../resolver/patient-external-source.resolver";
import { CreatePatientFromExternalSourcePayload, CreatePatientFromExternalSourceService } from "../create-patient-from-external-source.service";
import { PatientExternalNotificationDispatcher } from "../../notification-dispatcher/patient-external.notification-dispatcher";

describe('CreatePatientFromExternalSourceService', () => {
    let patientResolver: jest.Mocked<PatientExternalSourceResolver>;
    let notificationDispatcher: jest.Mocked<PatientExternalNotificationDispatcher>;
    let service: CreatePatientFromExternalSourceService;

    beforeEach(async () => {
        patientResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<PatientExternalSourceResolver>;

        notificationDispatcher = {
            emitAsync: jest.fn(),
        } as unknown as jest.Mocked<PatientExternalNotificationDispatcher>;

        service = new CreatePatientFromExternalSourceService(patientResolver, notificationDispatcher);
    });

    it('should resolve a patient', async () => {
        const mockCorporative: ClientModel = {
            patientId: 'patient-id',
        } as unknown as ClientModel;

        patientResolver.resolve.mockResolvedValue(mockCorporative);

        const payload: CreatePatientFromExternalSourcePayload = {
            owner: 'external-value',
            patientBirthday: new Date(),
            patientDni: '1234567890',
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname',
            patientName: 'patient name'
        };

        const result = await service.createAsync(payload);

        expect(patientResolver.resolve).toHaveBeenCalledWith(payload);
        expect(notificationDispatcher.emitAsync).toHaveBeenCalledWith(payload);
        expect(result).toEqual(mockCorporative);
    });
});
