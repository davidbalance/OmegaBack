import { TestExternalConnectionRepository } from "../../repository/model.repositories";
import { CreateTestFromExternalSourcePayload, CreateTestFromExternalSourceService } from "../create-test-from-external-source.service";
import { PatientExternalSourceResolver } from "../../resolver/patient-external-source.resolver";
import { OrderExternalSourceResolver } from "../../resolver/order-external-source.resolver";
import { TestExternalSourceResolver } from "../../resolver/test-external-source.resolver";
import { TestExternalConnectionModel } from "@omega/medical/core/model/test/test-external-connection.model";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";

describe('CreateTestFromExternalSourceService', () => {
    let service: CreateTestFromExternalSourceService;
    let externalConnection: jest.Mocked<TestExternalConnectionRepository>;
    let patientResolver: jest.Mocked<PatientExternalSourceResolver>;
    let orderResolver: jest.Mocked<OrderExternalSourceResolver>;
    let testResolver: jest.Mocked<TestExternalSourceResolver>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestExternalConnectionRepository>;

        patientResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<PatientExternalSourceResolver>;

        orderResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalSourceResolver>;

        testResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<TestExternalSourceResolver>;

        service = new CreateTestFromExternalSourceService(externalConnection, patientResolver, orderResolver, testResolver);
    });

    it('should return an existing test if it is already present in the repository', async () => {
        const mockTest: TestExternalConnectionModel = {
            testId: 'test-id',
            testExternalKey: 'external-value',
            testExternalOwner: 'external-owner'
        } as unknown as TestExternalConnectionModel;
        externalConnection.findOneAsync.mockResolvedValue(mockTest);

        const payload: CreateTestFromExternalSourcePayload = {
            owner: 'external-value',
            branchName: 'branch name',
            companyName: 'company name',
            companyRuc: '123456789001',
            corporativeName: 'corporative name',
            doctorDni: '1234567890',
            doctorFullname: 'doctor name',
            examName: 'exam name',
            examSubtype: 'exam subtype',
            examType: 'exam type',
            orderKey: 'order-key',
            orderProcess: 'order-process',
            orderYear: 2025,
            patientBirthday: new Date(),
            patientDni: '123456789',
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname',
            patientName: 'patient name',
            testKey: 'test-key'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.testKey },
            { field: 'testExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(patientResolver.resolve).not.toHaveBeenCalled();
        expect(orderResolver.resolve).not.toHaveBeenCalled();
        expect(testResolver.resolve).not.toHaveBeenCalled();
        expect(result).toEqual(mockTest);
    });

    it('should resolve corporative, company, and test when test is not found in the repository', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);

        const resolvedPatient: ClientModel = { patientDni: '1' } as unknown as ClientModel;
        const resolvedOrder: OrderExternalConnectionModel = { companyId: 'A' } as unknown as OrderExternalConnectionModel;
        const resolvedTest: TestExternalConnectionModel = { id: '456' } as unknown as TestExternalConnectionModel;

        patientResolver.resolve.mockResolvedValue(resolvedPatient);
        orderResolver.resolve.mockResolvedValue(resolvedOrder);
        testResolver.resolve.mockResolvedValue(resolvedTest);

        const payload: CreateTestFromExternalSourcePayload = {
            owner: 'external-value',
            branchName: 'branch name',
            companyName: 'company name',
            companyRuc: '123456789001',
            corporativeName: 'corporative name',
            doctorDni: '1234567890',
            doctorFullname: 'doctor name',
            examName: 'exam name',
            examSubtype: 'exam subtype',
            examType: 'exam type',
            orderKey: 'order-key',
            orderProcess: 'order-process',
            orderYear: 2025,
            patientBirthday: new Date(),
            patientDni: '123456789',
            patientEmail: 'test@email.com',
            patientGender: 'male',
            patientLastname: 'patient lastname',
            patientName: 'patient name',
            testKey: 'test-key'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.testKey },
            { field: 'testExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(patientResolver.resolve).toHaveBeenCalledWith(payload);
        expect(orderResolver.resolve).toHaveBeenCalledWith({ ...payload, patientDni: resolvedPatient.patientDni });
        expect(testResolver.resolve).toHaveBeenCalledWith({ ...payload, orderId: resolvedOrder.orderId });
        expect(result).toEqual(resolvedTest);
    });
});
