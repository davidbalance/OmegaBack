import { TestBed } from "@automock/jest";
import { PatientManagementService } from "../service/patient-management.service";
import { PatientExternalListener } from "./patient-external.listener";
import { PatientExternalCreateEvent } from "@/shared/events/patient.event";
import { PatientGenderEnum } from "../enums/patient.enum";
import { PostPatientRequestDto } from "../dtos/request/patient.post.dto";

describe('PatientExternalListener', () => {
    let service: PatientExternalListener;
    let externalConnectionService: jest.Mocked<PatientManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(PatientExternalListener).compile();

        service = unit;
        externalConnectionService = unitRef.get(PatientManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onExternalCreate', () => {
        const mockData: PostPatientRequestDto = {
            gender: PatientGenderEnum.MALE,
            birthday: new Date(),
            name: "Test name",
            lastname: "Test lastname",
            dni: "1234567890"
        };

        it('should call the external service to find one by dni', async () => {
            // Arrange
            externalConnectionService.findOneByDni.mockResolvedValue(undefined);

            // Act
            await service.onExternalCreate({ data: mockData });

            // Assert
            expect(externalConnectionService.findOneByDni).toHaveBeenCalledWith(mockData.dni);
            expect(externalConnectionService.create).not.toHaveBeenCalled()
        });

        it('should call the external service to create', async () => {
            // Arrange
            externalConnectionService.findOneByDni.mockRejectedValue(new Error('Not found'));
            externalConnectionService.create.mockResolvedValue(undefined);

            // Act
            await service.onExternalCreate({ data: mockData });

            // Assert
            expect(externalConnectionService.findOneByDni).toHaveBeenCalledWith(mockData.dni);
            expect(externalConnectionService.create).toHaveBeenCalledWith(mockData);
        });
    });
});
