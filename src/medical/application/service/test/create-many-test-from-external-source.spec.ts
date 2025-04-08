import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { CreateManyTestFromExternalSourcePayload, CreateManyTestFromExternalSourceService } from "../create-many-test-from-external-source.service";
import { CreateTestFromExternalSourceService } from "../create-test-from-external-source.service";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { CreateOrderFromExternalSourceService } from "../create-order-from-external-source.service";

describe('CreateManyTestFromExternalSourceService', () => {
    let createOrder: jest.Mocked<CreateOrderFromExternalSourceService>;
    let createTest: jest.Mocked<CreateTestFromExternalSourceService>;
    let service: CreateManyTestFromExternalSourceService;

    beforeEach(async () => {
        createOrder = {
            createAsync: jest.fn(),
        } as unknown as jest.Mocked<CreateOrderFromExternalSourceService>;

        createTest = {
            createAsync: jest.fn(),
        } as unknown as jest.Mocked<CreateTestFromExternalSourceService>;

        service = new CreateManyTestFromExternalSourceService(createOrder, createTest);
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

        createOrder.createAsync.mockResolvedValue(mockOrder);
        createTest.createAsync.mockResolvedValue(mockTest);

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

        const { tests, ...value } = payload;
        expect(createOrder.createAsync).toHaveBeenCalledWith({ ...value });
        expect(createTest.createAsync).toHaveBeenCalledTimes(payload.tests.length);
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

});
