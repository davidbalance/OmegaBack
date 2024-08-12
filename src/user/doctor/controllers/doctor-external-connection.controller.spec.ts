import { TestBed } from "@automock/jest";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { DoctorExternalConnectionController } from "./doctor-external-connection.controller";
import { PostDoctorRequestDto } from "../dtos/request/post.doctor.dto";
import { mockDoctor } from "../services/test/stub/doctor.stub";
import { PostDoctorResponseDto } from "../dtos/response/post.doctor.response.dto";
import { DoctorResponseDto } from "../dtos/response/base.doctor.response.dto";

describe('DoctorExternalConnectionController', () => {
    let controller: DoctorExternalConnectionController;
    let service: jest.Mocked<DoctorExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(DoctorExternalConnectionService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockDto: PostDoctorRequestDto = {
            name: "Mocked name",
            lastname: "Mocked lastname",
            email: "test@email.com",
            dni: "1234567890"
        };
        const mockedDoctor = mockDoctor();
        const mockedDoctorFlat: DoctorResponseDto = {
            ...mockedDoctor.user,
            ...mockedDoctor,
            user: mockedDoctor.user.id
        };
        const expectResult: PostDoctorResponseDto = mockedDoctorFlat;

        it('should create a new doctor', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedDoctorFlat);

            // Act
            const result = await controller.create(mockDto);

            // Assert
            expect(service.create).toHaveBeenCalledWith(mockDto);
            expect(result).toEqual(expectResult);
        });
    });

    describe('findOneAndUpddate', () => {
        const dni: string = '1234567890';
        const mockDto: PostDoctorRequestDto = {
            name: "Mocked name",
            lastname: "Mocked lastname",
            email: "test@email.com",
            dni: "1234567890"
        };
        const mockedDoctor = mockDoctor();
        const mockedDoctorFlat: DoctorResponseDto = {
            ...mockedDoctor.user,
            ...mockedDoctor,
            user: mockedDoctor.user.id
        };
        const expectResult: PostDoctorResponseDto = mockedDoctorFlat;

        it('should update a doctor', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedDoctorFlat);

            // Act
            const result = await controller.findOneAndUpddate(dni, mockDto);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith(dni, mockDto);
            expect(result).toEqual(expectResult);
        });
    });
});