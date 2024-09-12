import { TestBed } from "@automock/jest";
import { PatientExternalConnectionService } from "./patient-external-connection.service";
import { PatientManagementService } from "./patient-management.service";
import { PatientEventService } from "./patient-event.service";
import { PostExternalPatientRequestDto } from "../dtos/request/external-patient.post.dto";
import { PatientGenderEnum } from "../enums/patient.enum";
import { mockPatient } from "../stub/patient.stub";
import { PatchExternalPatientRequestDto } from "../dtos/request/external-patient.patch.dto";

describe('PatientExternalConnectionService', () => {
    let service: PatientExternalConnectionService;
    let managementService: jest.Mocked<PatientManagementService>;
    let eventService: jest.Mocked<PatientEventService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(PatientExternalConnectionService).compile();

        service = unit;
        managementService = unitRef.get(PatientManagementService);
        eventService = unitRef.get(PatientEventService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        const source = 'test-source';
        const data: PostExternalPatientRequestDto = {
            dni: '1234567890',
            name: 'Test User',
            lastname: 'Test Lastname',
            birthday: new Date(),
            jobPosition: {
                key: 'test-job-position-key',
                name: 'Test Job Position'
            },
            email: "test@email.com",
            gender: PatientGenderEnum.MALE
        };
        const mockedPatient = mockPatient();
        const expectedValue = mockedPatient;

        it('should create a new patient', async () => {
            // Arrange
            managementService.create.mockResolvedValue(mockedPatient);

            // Act
            const result = await service.create(source, data);

            // Assert
            const { jobPosition, ...expectedPatient } = data;
            expect(managementService.create).toHaveBeenCalledWith(expectedPatient);
            expect(eventService.emitMedicalClientExternalCreateEvent).toHaveBeenCalledWith(source, expectedPatient, jobPosition);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOne', () => {
        const dni = '1234567890';
        const mockedPatient = mockPatient();
        const expectedValue = mockedPatient;

        it('should find a patient by dni', async () => {
            // Arrange
            managementService.findOneByDni.mockResolvedValue(mockedPatient);

            // Act
            const result = await service.findOne(dni);

            // Assert
            expect(managementService.findOneByDni).toHaveBeenCalledWith(dni);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneOrCreate', () => {
        const source = 'test-source';
        const data: PostExternalPatientRequestDto = {
            dni: '1234567890',
            name: 'Test User',
            lastname: 'Test Lastname',
            birthday: new Date(),
            gender: PatientGenderEnum.MALE,
            jobPosition: {
                key: 'test-job-position-key',
                name: 'Test Job Position'
            },
            email: "test@email.com"
        };
        const mockedPatient = mockPatient();
        const expectedValue = mockedPatient;

        it('should find or create a new patient', async () => {
            // Arrange
            managementService.findOneByDni.mockResolvedValue(mockedPatient);

            // Act
            const result = await service.findOneOrCreate(source, data);

            // Assert
            expect(managementService.findOneByDni).toHaveBeenCalledWith(data.dni);
            expect(result).toEqual(expectedValue);
        });

        it('should create a new patient if not found', async () => {
            // Arrange
            managementService.findOneByDni.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedPatient);

            // Act
            const result = await service.findOneOrCreate(source, data);

            // Assert
            expect(managementService.findOneByDni).toHaveBeenCalledWith(data.dni);
            expect(service.create).toHaveBeenCalledWith(source, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const dni = '1234567890';
        const data: PatchExternalPatientRequestDto = {
            name: 'Updated User'
        };
        const mockedPatient = mockPatient();
        const expectedValue = mockedPatient;

        it('should update a patient', async () => {
            // Arrange
            managementService.updateOne.mockResolvedValue(mockedPatient);

            // Act
            const result = await service.findOneAndUpdate(dni, data);

            // Assert
            expect(managementService.updateOne).toHaveBeenCalledWith(dni, data);
            expect(result).toEqual(expectedValue);
        });
    })
});
