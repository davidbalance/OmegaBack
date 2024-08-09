import { TestBed } from "@automock/jest";
import { MedicalOrderExternalConnectionService } from "../services/medical-order-external-connection.service";
import { MedicalOrderManagementService } from "../services/medical-order-management.service";
import { MedicalOrderExternalConnectionController } from "./medical-order-external-connection.controller";
import { PostMedicalOrderExternalRequestDto } from "../dtos/request/post.medical-order-external.request.dto";
import { mockMedicalOrder, mockMedicalOrders } from "../services/test/stub/medical-order.stub";
import { GetMedicalOrderArrayResponseDto } from "../dtos/response/get.medical-order-array.response.dto";
import { mockMedicalOrderFlatArray } from "../services/test/stub/medical-order-result.stub";
import { GetMedicalOrderResponseDto } from "../dtos/response/get.medical-order.response.dto";
import { PatchMedicalOrderRequestDto } from "../dtos/request/patch.medical-order.request.dto";

describe('MedicalOrderExternalConnectionController', () => {
    let controller: MedicalOrderExternalConnectionController;
    let service: jest.Mocked<MedicalOrderExternalConnectionService>;
    let managementService: jest.Mocked<MedicalOrderManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalOrderExternalConnectionController).compile();

        controller = unit;
        service = unitRef.get(MedicalOrderExternalConnectionService);
        managementService = unitRef.get(MedicalOrderManagementService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const source = 'external-source';
        const key = 'external-key';
        const body: PostMedicalOrderExternalRequestDto = {
            branch: undefined,
            jobPosition: undefined,
            patient: undefined,
            process: "test process"
        };
        const mockedOrder = mockMedicalOrder();
        const expectResult = mockedOrder;

        it('should create a new medical order', async () => {
            // Arrange
            service.create.mockResolvedValueOnce(mockedOrder);

            // Act
            const result = await controller.create(source, key, body);

            // Assert
            expect(result).toEqual(expectResult);
            expect(service.create).toHaveBeenCalledWith({ source, key }, body);
        });
    });

    describe('findAllByPatient', () => {
        const dni: string = '1234567890';
        const mockedOrders = mockMedicalOrders();
        const expectResult: GetMedicalOrderArrayResponseDto = { data: mockedOrders as any };

        it('should return all medical orders for the given patient dni', async () => {
            // Arrange
            managementService.findAllByPatient.mockResolvedValueOnce(mockedOrders);

            // Act
            const result = await controller.findAllByPatient(dni);

            // Assert
            expect(result).toEqual(expectResult);
            expect(managementService.findAllByPatient).toHaveBeenCalledWith(dni);
        });
    });

    describe('findOne', () => {
        const source = 'external-source';
        const key = 'external-key';
        const mockedOrder = mockMedicalOrder();
        const expectResult: GetMedicalOrderResponseDto = mockedOrder as any;

        it('should return the medical order for the given source and key', async () => {
            // Arrange
            service.findOne.mockResolvedValueOnce(mockedOrder);

            // Act
            const result = await controller.findOne(source, key);

            // Assert
            expect(result).toEqual(expectResult);
            expect(service.findOne).toHaveBeenCalledWith({ key, source });
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'external-source';
        const key = 'external-key';
        const body: PatchMedicalOrderRequestDto = {
            process: "Test process"
        };
        const mockedOrder = mockMedicalOrder();
        const expectResult = mockedOrder;

        it('should update the medical order for the given source and key', async () => {
            // Arrange
            service.findOneAndUpdate.mockResolvedValueOnce(mockedOrder);

            // Act
            const result = await controller.findOneAndUpdate(source, key, body);

            // Assert
            expect(result).toEqual(expectResult);
            expect(service.findOneAndUpdate).toHaveBeenCalledWith({ key, source }, body);
        });
    });
});  