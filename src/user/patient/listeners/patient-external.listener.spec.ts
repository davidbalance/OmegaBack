import { TestBed } from "@automock/jest";
import { PatientManagementService } from "../service/patient-management.service";
import { PatientExternalListener } from "./patient-external.listener";
import { mockFlatPatient } from "../service/test/stub/patient-flat.stub";
import { PostPatientRequestDto } from "../dtos/request/post.patient.request.dto";
import { PatientGenderEnum } from "../enums/patient.enum";

describe('PatientExternalListener', () => {
    let listener: PatientExternalListener;
    let service: jest.Mocked<PatientManagementService>;
    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(PatientExternalListener).compile();

        listener = unit;
        service = unitRef.get(PatientManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onExternalCreate', () => {
        const mockDto: PostPatientRequestDto = {
            gender: PatientGenderEnum.MALE,
            birthday: new Date('2000-01-01'),
            name: "Name",
            lastname: "Lastname",
            dni: "1234567890"
        };
        const mockedData = mockFlatPatient();

        it('should find an existing patient by dni', async () => {
            // Arrange
            service.findOneByDni.mockResolvedValue(mockedData);

            // Act
            await listener.onExternalCreate({ data: mockDto });

            // Assert
            expect(service.findOneByDni).toHaveBeenCalledWith(mockedData.dni);
            expect(service.create).not.toHaveBeenCalled();
        });

        it('should create a new patient if not found', async () => {
            // Arrange
            service.findOneByDni.mockRejectedValue(new Error);
            service.create.mockResolvedValue(undefined);

            // Act
            await listener.onExternalCreate({ data: mockDto });

            // Assert
            expect(service.findOneByDni).toHaveBeenCalledWith(mockedData.dni);
            expect(service.create).toHaveBeenCalledWith(mockDto);
        });
    });

});