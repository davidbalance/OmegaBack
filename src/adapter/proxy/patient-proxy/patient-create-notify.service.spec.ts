import { PatientCreateCommandToken } from "@omega/profile/nest/inject/command.inject";
import { PatientCreateNotifyService } from "./patient-create-notify.service";
import { PatientCreateCommand } from "@omega/profile/application/command/user/patient-create.command";
import { Test, TestingModule } from "@nestjs/testing";
import { Logger } from "@nestjs/common";
import { ClientCreateCommandPayload } from "@omega/medical/application/commands/client/client-create.command";

describe("PatientCreateNotifyService", () => {
    let service: PatientCreateNotifyService;
    let createPatientCommand: jest.Mocked<PatientCreateCommand>;

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => { });

        createPatientCommand = {
            handleAsync: jest.fn()
        } as unknown as jest.Mocked<PatientCreateCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PatientCreateNotifyService,
                { provide: PatientCreateCommandToken, useValue: createPatientCommand },
            ]
        }).compile();

        service = module.get<PatientCreateNotifyService>(PatientCreateNotifyService);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });

    it('should call createPatientCommand.handleAsync with mapped payload', async () => {
        const payload: ClientCreateCommandPayload = {
            patientName: 'John',
            patientLastname: 'Doe',
            patientDni: '12345678',
            patientBirthday: new Date(),
            patientGender: 'male',
            patientEmail: 'john@example.com'
        };

        await service.emitAsync(payload);

        expect(createPatientCommand.handleAsync).toHaveBeenCalledWith({
            name: payload.patientName,
            lastname: payload.patientLastname,
            dni: payload.patientDni,
            birthday: payload.patientBirthday,
            gender: payload.patientGender,
            email: payload.patientEmail
        });
    });
});