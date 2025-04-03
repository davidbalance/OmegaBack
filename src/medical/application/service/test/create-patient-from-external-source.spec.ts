import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { PatientExternalSourceResolver } from "../../resolver/patient-external-source.resolver";
import { CreatePatientFromExternalSourcePayload, CreatePatientFromExternalSourceService } from "../create-patient-from-external-source.service";

describe('CreatePatientFromExternalSourceService', () => {
    let service: CreatePatientFromExternalSourceService;
    let patientResolver: jest.Mocked<PatientExternalSourceResolver>;

    beforeEach(async () => {
        patientResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<PatientExternalSourceResolver>;

        service = new CreatePatientFromExternalSourceService(patientResolver);
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
        expect(result).toEqual(mockCorporative);
    });
});
