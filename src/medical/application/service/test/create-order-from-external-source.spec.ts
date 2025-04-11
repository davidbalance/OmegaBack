import { OrderExternalConnectionModel } from "@omega/medical/core/model/order/order-external-connection.model";
import { OrderExternalConnectionRepository } from "../../repository/model.repositories";
import { OrderExternalSourceResolver } from "../../resolver/order-external-source.resolver";
import { PatientExternalSourceResolver } from "../../resolver/patient-external-source.resolver";
import { CreateOrderFromExternalSourcePayload, CreateOrderFromExternalSourceService } from "../create-order-from-external-source.service";
import { ClientModel } from "@omega/medical/core/model/client/client.model";
import { OrderExternalNotificationDispatcher } from "../../notification-dispatcher/order-external.notification-dispatcher";

describe('CreateOrderFromExternalSourceService', () => {
    let externalConnection: jest.Mocked<OrderExternalConnectionRepository>;
    let patientResolver: jest.Mocked<PatientExternalSourceResolver>;
    let orderResolver: jest.Mocked<OrderExternalSourceResolver>;
    let notificationDispatcher: jest.Mocked<OrderExternalNotificationDispatcher>;
    let service: CreateOrderFromExternalSourceService;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalConnectionRepository>;

        patientResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<PatientExternalSourceResolver>;

        orderResolver = {
            resolve: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalSourceResolver>;

        notificationDispatcher = {
            emitAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalNotificationDispatcher>;

        service = new CreateOrderFromExternalSourceService(
            externalConnection,
            patientResolver,
            orderResolver,
            notificationDispatcher
        );
    });

    it('should return an existing order if it is already present in the repository', async () => {
        const mockOrder: OrderExternalConnectionModel = {
            orderId: 'order-id',
            orderExternalKey: 'external-value',
            orderExternalOwner: 'external-owner'
        } as unknown as OrderExternalConnectionModel;
        externalConnection.findOneAsync.mockResolvedValue(mockOrder);

        const payload: CreateOrderFromExternalSourcePayload = {
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
            patientName: 'patient name'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(patientResolver.resolve).not.toHaveBeenCalled();
        expect(orderResolver.resolve).not.toHaveBeenCalled();
        expect(orderResolver.resolve).not.toHaveBeenCalled();
        expect(notificationDispatcher.emitAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockOrder);
    });

    it('should resolve corporative and order when order is not found in the repository', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);

        const resolvedPatient: ClientModel = { patientDni: '1' } as unknown as ClientModel;
        const resolvedOrder: OrderExternalConnectionModel = { orderId: 'A' } as unknown as OrderExternalConnectionModel;

        patientResolver.resolve.mockResolvedValue(resolvedPatient);
        orderResolver.resolve.mockResolvedValue(resolvedOrder);

        const payload: CreateOrderFromExternalSourcePayload = {
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
            patientName: 'patient name'
        };

        const result = await service.createAsync(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(patientResolver.resolve).toHaveBeenCalledWith(payload);
        expect(orderResolver.resolve).toHaveBeenCalledWith({ ...payload, patientDni: resolvedPatient.patientDni });
        expect(notificationDispatcher.emitAsync).toHaveBeenCalledWith({ ...payload, patientDni: resolvedPatient.patientDni });
        expect(result).toEqual(resolvedOrder);
    });
});
