import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalConnectionRepository } from "../../repository/model.repositories";
import { CreateManyTestFromExternalSourcePayload, CreateManyTestFromExternalSourceService } from "../create-many-test-from-external-source.service";
import { CreateTestFromExternalSourceService } from "../create-test-from-external-source.service";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { OrderExternalKeyNotFoundError } from "@omega/medical/core/domain/order/errors/order-external-key.errors";

describe('CreateManyTestFromExternalSourceService', () => {
    let externalConnection: jest.Mocked<OrderExternalConnectionRepository>;
    let createTest: jest.Mocked<CreateTestFromExternalSourceService>;
    let service: CreateManyTestFromExternalSourceService;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalConnectionRepository>;

        createTest = {
            createAsync: jest.fn(),
        } as unknown as jest.Mocked<CreateTestFromExternalSourceService>;

        service = new CreateManyTestFromExternalSourceService(externalConnection, createTest);
    });

    it('should successfully create tests and return the correct TestOrderExternal', async () => {
        const mockOrder: OrderExternalConnectionModel = {
            orderId: 'order-id',
            orderExternalKey: 'external-value',
            orderExternalOwner: 'external-owner',
            patientDni: '1234567890'
        } as unknown as OrderExternalConnectionModel;

        const mockTest: TestExternalConnectionModel = {
            testId: 'test-id',
            testExternalKey: 'external-value',
            testExternalOwner: 'external-owner'
        } as unknown as TestExternalConnectionModel;

        createTest.createAsync.mockResolvedValue(mockTest);
        externalConnection.findOneAsync.mockResolvedValue(mockOrder);

        const payload: CreateManyTestFromExternalSourcePayload = {
            owner: 'external-owner',
            orderKey: 'order-key',
            branchName: 'branch name',
            companyName: 'company name',
            companyRuc: '123456789001',
            corporativeName: 'corporative name',
            doctorDni: '1234567890',
            doctorFullname: 'doctor dni',
            orderProcess: 'order-process',
            orderYear: 2025,
            patientBirthday: new Date(),
            patientDni: mockOrder.patientDni,
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname',
            patientName: 'patient name',
            tests: [
                { examName: 'exam name 1', examSubtype: 'exam subtype 1', examType: 'exam type 1', testKey: 'test-key-1' },
                { examName: 'exam name 2', examSubtype: 'exam subtype 2', examType: 'exam type 2', testKey: 'test-key-2' },
            ],
        };

        const result = await service.createAsync(payload);

        expect(createTest.createAsync).toHaveBeenCalledTimes(payload.tests.length);
        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(result).toEqual({
            patientDni: mockOrder.patientDni,
            orderId: mockOrder.orderId,
            orderExternalKey: mockOrder.orderExternalKey,
            orderExternalOwner: mockOrder.orderExternalOwner,
            tests: Array.from({ length: payload.tests.length })
                .map((_, i) => ({
                    testId: mockTest.testId,
                    testExternalKey: mockTest.testExternalKey,
                    testExternalOwner: mockTest.testExternalOwner,
                }))
        });
    });

    it('should throw OrderExternalKeyNotFoundError if external order is not found', async () => {

        const mockTest: TestExternalConnectionModel = {
            testId: 'test-id',
            testExternalKey: 'external-value',
            testExternalOwner: 'external-owner'
        } as unknown as TestExternalConnectionModel;

        createTest.createAsync.mockResolvedValue(mockTest);
        externalConnection.findOneAsync.mockResolvedValue(null);

        const payload: CreateManyTestFromExternalSourcePayload = {
            owner: 'external-owner',
            orderKey: 'order-key',
            branchName: 'branch name',
            companyName: 'company name',
            companyRuc: '123456789001',
            corporativeName: 'corporative name',
            doctorDni: '1234567890',
            doctorFullname: 'doctor dni',
            orderProcess: 'order-process',
            orderYear: 2025,
            patientBirthday: new Date(),
            patientDni: '1234567890',
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname',
            patientName: 'patient name',
            tests: [
                { examName: 'exam name 1', examSubtype: 'exam subtype 1', examType: 'exam type 1', testKey: 'test-key-1' },
                { examName: 'exam name 2', examSubtype: 'exam subtype 2', examType: 'exam type 2', testKey: 'test-key-2' },
            ],
        };

        await expect(service.createAsync(payload)).rejects.toThrow(OrderExternalKeyNotFoundError);

        expect(createTest.createAsync).toHaveBeenCalledTimes(payload.tests.length);
        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.owner },
        ]);
    });
});
