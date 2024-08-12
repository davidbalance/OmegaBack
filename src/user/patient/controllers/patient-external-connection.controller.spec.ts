import { TestBed } from "@automock/jest";
import { PatientExternalConnectionService } from "../service/patient-external-connection.service";
import { PatientExternalConnectionController } from "./patient-external-connection.controller";
import { PostPatientExternalRequestDto } from "../dtos/request/post.patient-external.request.dto";
import { PatientGenderEnum } from "../enums/patient.enum";
import { mockFlatPatient } from "../service/test/stub/patient-flat.stub";
import { PatchPatientRequestDto } from "../dtos/request/patch.patient.request.dto";

describe('PatientExternalConnectionController', () => {
    let controller: PatientExternalConnectionController;
    let service: jest.Mocked<PatientExternalConnectionService>;
    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(PatientExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(PatientExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source: string = 'external-source';
        const mockDto: PostPatientExternalRequestDto = {
            email: "test@email.com",
            jobPosition: undefined,
            gender: PatientGenderEnum.MALE,
            birthday: new Date('2000-01-01'),
            name: "Name",
            lastname: "Lastname",
            dni: "1234567890"
        };
        const mockedPatient = mockFlatPatient();
        const expectResult = mockedPatient;

        it('should create a new patient', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedPatient);

            // Act
            const result = await controller.create(source, mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith(source, mockDto);
            expect(result).toEqual(expectResult);
        });
    });

    describe('findOneAndUpdate', () => {
        const source: string = 'external-source';
        const dni: string = '1234567890';
        const mockDto: PatchPatientRequestDto = {
            birthday: new Date('2000-01-01'),
            gender: PatientGenderEnum.MALE,
            lastname: 'Lastname',
            name: 'Name'
        };
        const mockedPatient = mockFlatPatient();
        const expectResult = mockedPatient;

        it('should update a patient', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedPatient);

            // Act
            const result = await controller.findOneAndUpdate(source, dni, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith(dni, mockDto);
            expect(result).toEqual(expectResult);
        });
    });
});