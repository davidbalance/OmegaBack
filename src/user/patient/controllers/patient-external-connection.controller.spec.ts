import { TestBed } from "@automock/jest";
import { PatientExternalConnectionController } from "./patient-external-connection.controller";
import { PostExternalPatientRequestDto } from "../dtos/request/external-patient.post.dto";
import { PatientGenderEnum } from "../enums/patient.enum";
import { mockPatient } from "../stub/patient.stub";
import { mockExternalPatient } from "../stub/external-patient.stub";
import { PatientExternalConnectionService } from "../service/patient-external-connection.service";
import { PatchExternalPatientRequestDto } from "../dtos/request/external-patient.patch.dto";

describe('PatientExternalConnectionController', () => {
    let controller: PatientExternalConnectionController;
    let service: jest.Mocked<PatientExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(PatientExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(PatientExternalConnectionService);
    });

    describe('create', () => {
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
        const mockedPatient = mockExternalPatient();
        const expectedValue = mockedPatient;

        it('should create a new patient', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedPatient);

            // Act
            const result = await service.create(source, data);

            // Assert
            expect(service.create).toHaveBeenCalledWith(source, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const dni = '1234567890';
        const data: PatchExternalPatientRequestDto = {
            name: 'Updated User'
        };
        const mockedPatient = mockExternalPatient();
        const expectedValue = mockedPatient;

        it('should create a new patient', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedPatient);

            // Act
            const result = await service.findOneAndUpdate(dni, data);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith(dni, data);
            expect(result).toEqual(expectedValue);
        });
    });
})