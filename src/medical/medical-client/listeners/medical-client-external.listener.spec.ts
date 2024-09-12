import { TestBed } from "@automock/jest";
import { MedicalClientEmailService } from "../services/medical-client-email.service";
import { MedicalClientEventService } from "../services/medical-client-event.service";
import { MedicalClientJobPositionService } from "../services/medical-client-job-position.service";
import { MedicalClientManagementService } from "../services/medical-client-management.service";
import { MedicalClientExternalListener } from "./medical-client-external.listener";
import { MedicalClientExternalCreateEvent } from "@/shared/events/medical-client.event";
import { PostMedicalClientRequestDto } from "../dtos/request/medical-client.post.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { ExternalJobPositionWithKeyRequestDto } from "@/location/job-position/dtos/request/external-job-position-with-key.base.dto";

describe('MedicalClientExternalListener', () => {
    let listener: MedicalClientExternalListener;
    let clientService: jest.Mocked<MedicalClientManagementService>;
    let emailService: jest.Mocked<MedicalClientEmailService>;
    let jobPositionService: jest.Mocked<MedicalClientJobPositionService>;
    let eventService: jest.Mocked<MedicalClientEventService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalClientExternalListener).compile();

        listener = unit;
        clientService = unitRef.get(MedicalClientManagementService);
        emailService = unitRef.get(MedicalClientEmailService);
        jobPositionService = unitRef.get(MedicalClientJobPositionService);
        eventService = unitRef.get(MedicalClientEventService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('externalCreate', () => {
        const source = 'external-source';
        const data: PostMedicalClientRequestDto = {
            email: "test@email.com",
            gender: PatientGenderEnum.MALE,
            birthday: new Date(),
            name: "Test name",
            lastname: "Test lastname",
            dni: "1234567890"
        };
        const jobPosition: ExternalJobPositionWithKeyRequestDto = {
            key: "test-key",
            name: "Test position"
        };
        const event: MedicalClientExternalCreateEvent = new MedicalClientExternalCreateEvent(
            source,
            data,
            jobPosition
        );

        it('should create a new client, assign email, assign job position, and emit an event', async () => {
            // Arrange
            clientService.create.mockResolvedValueOnce(undefined);
            emailService.assignEmail.mockResolvedValueOnce(undefined);
            jobPositionService.assignJobPosition.mockResolvedValueOnce(undefined);

            // Act
            await listener.externalCreate(event);

            // Assert
            expect(clientService.create).toHaveBeenCalledWith(data);
            expect(emailService.assignEmail).toHaveBeenCalledWith(data.dni, { email: data.email });
            expect(jobPositionService.assignJobPosition).toHaveBeenCalledWith(data.dni, { jobPositionName: jobPosition.name });
            expect(eventService.emitJobPositionExternalCreateEvent).toHaveBeenCalledWith(source, jobPosition);
        });
    });
});