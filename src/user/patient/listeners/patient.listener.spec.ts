import { TestBed } from "@automock/jest";
import { PatientManagementService } from "../service/patient-management.service";
import { PatientListener } from "./patient.listener";
import { PostPatientRequestDto } from "../dtos/request/patient.post.dto";
import { PatientGenderEnum } from "../enums/patient.enum";
import { mockPatient } from "../stub/patient.stub";

describe('PatientListener', () => {
    let listener: PatientListener;
    let service: jest.Mocked<PatientManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(PatientListener).compile();

        listener = unit;
        service = unitRef.get(PatientManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('onCreateEvent', () => {
        const data: PostPatientRequestDto = {
            gender: PatientGenderEnum.MALE,
            birthday: new Date(),
            name: "Test",
            lastname: "Test",
            dni: "1234567890"
        };
        const mockedPatient = mockPatient();

        it('should call findOneByDni on service', async () => {
            // Arrange
            service.findOneByDni.mockResolvedValueOnce(mockedPatient);

            // Act
            await listener.onCreateEvent({ data });

            // Assert
            expect(service.findOneByDni).toHaveBeenCalledWith(data.dni);
            expect(service.create).not.toHaveBeenCalled();
        });

        it('should call findOneByDni on service and throw error', async () => {
            // Arrange
            service.findOneByDni.mockRejectedValue(new Error());

            // Act
            await listener.onCreateEvent({ data });

            // Assert
            expect(service.findOneByDni).toHaveBeenCalledWith(data.dni);
            expect(service.create).toHaveBeenCalledWith(data);
        });
    });
});
