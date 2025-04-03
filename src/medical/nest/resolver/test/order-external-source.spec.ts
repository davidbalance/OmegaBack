import { Test, TestingModule } from '@nestjs/testing';
import { OrderCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { OrderExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { OrderExternalSourceNestResolver } from '../order-external-source.nest-resolver';
import { OrderExternalConnectionRepository } from '@omega/medical/application/repository/model.repositories';
import { OrderCreateFromExternalSourceCommand } from '@omega/medical/application/commands/order/order-create-from-external-source.command';
import { OrderExternalSourceResolverPayload } from '@omega/medical/application/resolver/order-external-source.resolver';
import { OrderExternalConnectionModel } from '@omega/medical/core/model/order/order-external-connection.model';
import { OrderExternalKeyNotFoundError } from '@omega/medical/core/domain/order/errors/order-external-key.errors';

describe('OrderExternalSourceNestResolver', () => {
    let resolver: OrderExternalSourceNestResolver;
    let externalConnection: jest.Mocked<OrderExternalConnectionRepository>;
    let createCommand: jest.Mocked<OrderCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<OrderCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                OrderExternalSourceNestResolver,
                { provide: OrderExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: OrderCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<OrderExternalSourceNestResolver>(OrderExternalSourceNestResolver);
    });

    it('should return an existing order if found', async () => {
        const mockOrder: OrderExternalConnectionModel = {
            orderId: 'order-id',
            orderExternalKey: 'external-value',
            orderExternalOwner: 'external-owner'
        } as unknown as OrderExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockOrder);

        const payload: OrderExternalSourceResolverPayload = {
            owner: 'external-owner',
            orderKey: 'external-value',
            patientDni: '123456789',
            corporativeName: 'Corporative name',
            companyRuc: '123456789001',
            companyName: 'Company value',
            branchName: 'Branch value',
            doctorDni: '123456789',
            doctorFullname: 'Doctor Name',
            orderProcess: 'order-process',
            orderYear: 2025,
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockOrder);
    });

    it('should create an order if not found', async () => {
        const mockOrder: OrderExternalConnectionModel = {
            orderId: 'order-id',
            orderExternalKey: 'external-value',
            orderExternalOwner: 'external-owner'
        } as unknown as OrderExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockOrder);

        const payload: OrderExternalSourceResolverPayload = {
            owner: 'external-owner',
            orderKey: 'external-value',
            patientDni: '123456789',
            corporativeName: 'Corporative name',
            companyRuc: '123456789001',
            companyName: 'Company value',
            branchName: 'Branch value',
            doctorDni: '123456789',
            doctorFullname: 'Doctor Name',
            orderProcess: 'order-process',
            orderYear: 2025,
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            ...payload,
            process: payload.orderProcess,
            year: payload.orderYear,
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.orderKey,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw OrderExternalKeyNotFoundError if order is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: OrderExternalSourceResolverPayload = {
            owner: 'external-owner',
            orderKey: 'external-value',
            patientDni: '123456789',
            corporativeName: 'Corporative name',
            companyRuc: '123456789001',
            companyName: 'Company value',
            branchName: 'Branch value',
            doctorDni: '123456789',
            doctorFullname: 'Doctor Name',
            orderProcess: 'order-process',
            orderYear: 2025,
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(OrderExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'orderExternalKey', operator: 'eq', value: payload.orderKey },
            { field: 'orderExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            ...payload,
            process: payload.orderProcess,
            year: payload.orderYear,
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.orderKey,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
