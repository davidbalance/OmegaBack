import { TestBed } from "@automock/jest";
import { MedicalClientEmailService } from "./medical-client-email.service";
import { MedicalClientEventService } from "./medical-client-event.service";
import { MedicalClientJobPositionService } from "./medical-client-job-position.service";
import { MedicalClientLocalService } from "./medical-client-local.service";
import { MedicalClientManagementService } from "./medical-client-management.service";
import { mockManagement } from "@/location/management/stub/management.stub";
import { mockMedicalClient } from "../stub/medical-client.stub";
import { PostLocalMedicalClientRequestDto } from "../dtos/request/local-medical-client.post.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockJobPosition } from "@/location/job-position/stub/job-position.stub";
import { mockMedicalClientJobPosition } from "../stub/medical-client-job-position.stub";

describe('MedicalClientLocalService', () => {
    let service: MedicalClientLocalService;
    let managementService: jest.Mocked<MedicalClientManagementService>;
    let emailService: jest.Mocked<MedicalClientEmailService>;
    let eventService: jest.Mocked<MedicalClientEventService>;
    let jobPositionService: jest.Mocked<MedicalClientJobPositionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalClientLocalService).compile();

        service = unit;
        managementService = unitRef.get(MedicalClientManagementService);
        emailService = unitRef.get(MedicalClientEmailService);
        eventService = unitRef.get(MedicalClientEventService);
        jobPositionService = unitRef.get(MedicalClientJobPositionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {

        const mockedClient = mockMedicalClient();
        const mockedJobposition = mockMedicalClientJobPosition();

        const data: PostLocalMedicalClientRequestDto = {
            email: "test@email.com",
            gender: PatientGenderEnum.MALE,
            birthday: new Date(),
            name: "Test",
            lastname: "Test",
            dni: "1234567890"
        }

        it('should create a new medical client and assign an email without jobposition', async () => {
            // Arrange
            managementService.create.mockResolvedValue(mockedClient);
            emailService.assignEmail.mockResolvedValue(undefined);
            jobPositionService.assignJobPosition.mockResolvedValue(undefined);
            eventService.emitLocalCreateEvent.mockReturnValue(undefined);

            // Act
            const result = await service.create(data);

            // Assert
            expect(managementService.create).toHaveBeenCalledWith(data);
            expect(emailService.assignEmail).toHaveBeenCalledWith(data.dni, { email: data.email });
            expect(jobPositionService.assignJobPosition).not.toHaveBeenCalled();
            expect(JSON.stringify(result)).toBe(JSON.stringify({ ...mockedClient }));

        });

        it('should create a new medical client and assign an email with jobposition', async () => {
            // Arrange
            managementService.create.mockResolvedValue(mockedClient);
            emailService.assignEmail.mockResolvedValue(undefined);
            jobPositionService.assignJobPosition.mockResolvedValue(mockedJobposition);
            eventService.emitLocalCreateEvent.mockReturnValue(undefined);

            // Act
            const result = await service.create({ ...data, jobPosition: { name: 'Test job position' } });

            // Assert
            expect(managementService.create).toHaveBeenCalledWith(data);
            expect(emailService.assignEmail).toHaveBeenCalledWith(data.dni, { email: data.email });
            expect(jobPositionService.assignJobPosition).toHaveBeenCalledWith(data.dni, { jobPositionName: 'Test job position' });
            expect(JSON.stringify(result)).toBe(JSON.stringify({ ...mockedClient, ...mockedJobposition }));

        });
    })
});