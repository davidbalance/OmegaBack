import { TestBed } from "@automock/jest";
import { MedicalClientLocalService } from "../services/medical-client-local.service";
import { MedicalClientManagementController } from "./medical-client-management.controller";
import { PostLocalMedicalClientRequestDto } from "../dtos/request/local-medical-client.post.dto";
import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";

describe('MedicalClientManagementController', () => {
    let controller: MedicalClientManagementController;
    let service: jest.Mocked<MedicalClientLocalService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalClientManagementController).compile();

        controller = unit;
        service = unitRef.get(MedicalClientLocalService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('shoudl create a medical client', async () => {
            // Arrange
            const data: PostLocalMedicalClientRequestDto = {
                email: "test@email.com",
                gender: PatientGenderEnum.MALE,
                birthday: new Date(),
                name: "Test",
                lastname: "Test",
                dni: "1234567890"
            };
            service.create.mockResolvedValue(undefined);

            // Act
            const result = await controller.create(data);

            // Assert
            expect(service.create).toHaveBeenCalledWith(data);
            expect(result).toBe('');
        });
    });
});