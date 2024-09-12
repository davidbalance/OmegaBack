import { PatientGenderEnum } from "@/user/patient/enums/patient.enum";
import { mockExternalMedicalOrder, mockExternalMedicalOrders } from "../stubs/external-medical-order-entity.stub";
import { PostExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.post.dto";
import { PatchExternalMedicalOrderRequestDto } from "../dtos/request/external-medical-order.patch.dto";
import { TestBed } from "@automock/jest";
import { MedicalOrderExternalConnectionService } from "../services/medical-order-external-connection.service";
import { MedicalOrderExternalConnectionController } from "./medical-order-external-connection.controller";

describe('MedicalOrderExternalConnectionController', () => {
    let controller: MedicalOrderExternalConnectionController;
    let service: jest.Mocked<MedicalOrderExternalConnectionService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderExternalConnectionController).compile();
        controller = unit;
        service = unitRef.get(MedicalOrderExternalConnectionService);
    });

    describe('create', () => {
        const source = 'source';
        const key = 'key';
        const data: PostExternalMedicalOrderRequestDto = {
            branch: {
                key: 'test-medicalOrder-key',
                name: 'Test medicalOrder',
                company: {
                    ruc: '1234567890',
                    name: 'Test Company',
                    corporativeGroup: {
                        key: 'test-corporative-group-key',
                        name: 'Test Corporative Group'
                    },
                    key: "test-company-key",
                    address: "Test address",
                    phone: "0999999999"
                },
                city: "Quito"
            },
            patient: {
                dni: '1234567890',
                name: 'Test User',
                lastname: 'Test Lastname',
                birthday: new Date(),
                gender: PatientGenderEnum.MALE,
                email: "test@email.com"
            },
            jobPosition: {
                key: 'test-job-position',
                name: 'Test jobposition'
            },
            process: "Test process"
        };
        const mockedOrder = mockExternalMedicalOrder();
        const expectedValue = mockedOrder;

        it('should call the service to create a new medicalOrder', async () => {
            // Arrange
            service.create.mockResolvedValue(mockedOrder);

            // Act
            const result = await controller.create(source, key, data);

            // Assert
            expect(service.create).toHaveBeenCalledWith({ source, key }, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findAllByPatient', () => {
        const dni = '1234567890';
        const mockedOrders = mockExternalMedicalOrders();
        const expectedValue = mockedOrders

        it('should call the service to update a medicalOrder', async () => {
            // Arrange
            service.find.mockResolvedValue(mockedOrders);

            // Act
            const result = await controller.findAllByPatient(dni);

            // Assert
            expect(service.find).toHaveBeenCalledWith(dni);
            expect(result).toEqual({ data: expectedValue });
        });
    });

    describe('findOneByExternalKey', () => {
        const source = 'source';
        const key = 'key';
        const mockedOrders = mockExternalMedicalOrder();
        const expectedValue = mockedOrders

        it('should call the service to update a medicalOrder', async () => {
            // Arrange
            service.findOne.mockResolvedValue(mockedOrders);

            // Act
            const result = await controller.findOneByExternalKey(source, key);

            // Assert
            expect(service.findOne).toHaveBeenCalledWith({ source, key });
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneById', () => {
        const id = 1;
        const mockedOrders = mockExternalMedicalOrder();
        const expectedValue = mockedOrders

        it('should call the service to update a medicalOrder', async () => {
            // Arrange
            service.findOne.mockResolvedValue(mockedOrders);

            // Act
            const result = await controller.findOneById(id);

            // Assert
            expect(service.findOne).toHaveBeenCalledWith(id);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'source';
        const key = 'key';
        const data: PatchExternalMedicalOrderRequestDto = {
            process: "Testing process"
        };
        const mockedOrder = mockExternalMedicalOrder();
        const expectedValue = mockedOrder

        it('should call the service to update a medicalOrder', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValue(mockedOrder);

            // Act
            const result = await controller.findOneAndUpdate(source, key, data);

            // Assert
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ source, key }, data);
            expect(result).toEqual(expectedValue);
        });
    });

});