import { Test, TestingModule } from '@nestjs/testing';
import { CompanyExternalSourceNestResolver } from '../company-external-source.nest-resolver';
import { CompanyExternalConnectionRepository } from '@omega/location/application/repository/model.repositories';
import { CompanyCreateFromExternalSourceCommand } from '@omega/location/application/command/corporative/company-create-from-external-source.command';
import { CompanyExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { CompanyCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { CompanyExternalConnectionModel } from '@omega/location/core/models/corporative/company-external-connection.model';
import { CompanyExternalSourceResolverPayload } from '@omega/location/application/resolver/company-external-source.resolver';
import { CompanyExternalKeyNotFoundError } from '@omega/location/core/domain/corporative/errors/company-external-key.errors';

describe('CompanyExternalSourceNestResolver', () => {
    let resolver: CompanyExternalSourceNestResolver;
    let externalConnection: jest.Mocked<CompanyExternalConnectionRepository>;
    let createCommand: jest.Mocked<CompanyCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CompanyExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<CompanyCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CompanyExternalSourceNestResolver,
                { provide: CompanyExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: CompanyCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<CompanyExternalSourceNestResolver>(CompanyExternalSourceNestResolver);
    });

    it('should return an existing company if found', async () => {
        const mockSubcorporative: CompanyExternalConnectionModel = {
            companyId: 'company-id',
            companyExternalKey: 'external-value',
            companyExternalOwner: 'external-owner'
        } as unknown as CompanyExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockSubcorporative);

        const payload: CompanyExternalSourceResolverPayload = {
            owner: 'external-owner',
            companyKey: 'external-value',
            companyName: 'company name',
            companyAddress: 'Company Address',
            companyPhone: '09999999999',
            companyRuc: '0123456789001',
            corporativeId: 'corporative-id'
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalKey', operator: 'eq', value: payload.companyKey },
            { field: 'companyExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockSubcorporative);
    });

    it('should create an company if not found', async () => {
        const mockSubcorporative: CompanyExternalConnectionModel = {
            companyId: 'company-id',
            companyExternalKey: 'external-value',
            companyExternalOwner: 'external-owner'
        } as unknown as CompanyExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockSubcorporative);

        const payload: CompanyExternalSourceResolverPayload = {
            owner: 'external-owner',
            companyKey: 'external-value',
            companyName: 'company name',
            companyAddress: 'Company Address',
            companyPhone: '09999999999',
            companyRuc: '0123456789001',
            corporativeId: 'corporative-id'
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalKey', operator: 'eq', value: payload.companyKey },
            { field: 'companyExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.companyKey,
            address: payload.companyAddress,
            corporativeId: payload.corporativeId,
            name: payload.companyName,
            phone: payload.companyPhone,
            ruc: payload.companyRuc
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw CompanyExternalKeyNotFoundError if company is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: CompanyExternalSourceResolverPayload = {
            owner: 'external-owner',
            companyKey: 'external-value',
            companyName: 'company name',
            companyAddress: 'Company Address',
            companyPhone: '09999999999',
            companyRuc: '0123456789001',
            corporativeId: 'corporative-id'
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(CompanyExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'companyExternalKey', operator: 'eq', value: payload.companyKey },
            { field: 'companyExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.companyKey,
            address: payload.companyAddress,
            corporativeId: payload.corporativeId,
            name: payload.companyName,
            phone: payload.companyPhone,
            ruc: payload.companyRuc
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
