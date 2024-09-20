import { TestBed } from "@automock/jest";
import { DoctorExternalConnectionService } from "../services/doctor-external-connection.service";
import { DoctorExternalConnectionController } from "./doctor-external-connection.controller";
import { PostDoctorRequestDto } from "../dtos/request/doctor.post.dto";
import { mockDoctor } from "../stub/doctor.stub";
import { PatchDoctorRequestDto } from "../dtos/request/doctor.patch.dto";

describe('DoctorExternalConnectionController', () => {

    let controller: DoctorExternalConnectionController;
    let service: jest.Mocked<DoctorExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(DoctorExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(DoctorExternalConnectionService);
    });


    describe('create', () => {
        const data: PostDoctorRequestDto = {
            dni: '1234567890',
            name: 'Test User',
            lastname: 'Test Lastname',
            email: "test@email.com"
        };
        const mockedDoctor = mockDoctor();
        const expectedValue = mockedDoctor;

        it('should call the service to create a new company', async () => {
            // Arrange
            service.findOneOrCreate.mockResolvedValue(mockedDoctor);

            // Act
            const result = await controller.create(data);

            // Assert
            expect(service.findOneOrCreate).toHaveBeenCalledWith(data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const dni = '1234567890';
        const data: PatchDoctorRequestDto = {
            name: 'Updated User'
        };
        const mockedDoctor = mockDoctor();
        const expectedValue = mockedDoctor;

        it('should call the service to update a company', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedDoctor);

            // Act
            const result = await controller.findOneAndUpdate(dni, data);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith(dni, data);
            expect(result).toEqual(expectedValue);
        });
    });
})