import { Test, TestingModule } from '@nestjs/testing';
import { CorporativeExternalSourceNestResolver } from '../corporative-external-source.nest-resolver';
import { CorporativeExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { CorporativeCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { CorporativeExternalConnectionRepository } from '@omega/location/application/repository/model.repositories';
import { CorporativeCreateFromExternalSourceCommand } from '@omega/location/application/command/corporative/corporative-create-from-external-source.command';
import { CorporativeExternalConnectionModel } from '@omega/location/core/models/corporative/corporative-external-connection.model';
import { CorporativeExternalSourceResolverPayload } from '@omega/location/application/resolver/corporative-external-source.resolver';
import { CorporativeExternalKeyNotFoundError } from '@omega/location/core/domain/corporative/errors/corporative-external-key.errors';

describe('CorporativeExternalSourceNestResolver', () => {
    let resolver: CorporativeExternalSourceNestResolver;
    let externalConnection: jest.Mocked<CorporativeExternalConnectionRepository>;
    let createCommand: jest.Mocked<CorporativeCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<CorporativeCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                CorporativeExternalSourceNestResolver,
                { provide: CorporativeExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: CorporativeCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<CorporativeExternalSourceNestResolver>(CorporativeExternalSourceNestResolver);
    });

    it('should return an existing corporative if found', async () => {
        const mockSubcorporative: CorporativeExternalConnectionModel = {
            corporativeId: 'corporative-id',
            corporativeExternalKey: 'external-value',
            corporativeExternalOwner: 'external-owner'
        } as unknown as CorporativeExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockSubcorporative);

        const payload: CorporativeExternalSourceResolverPayload = {
            corporativeKey: 'external-value',
            owner: 'external-owner',
            corporativeName: 'corporative name',
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalKey', operator: 'eq', value: payload.corporativeKey },
            { field: 'corporativeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockSubcorporative);
    });

    it('should create an corporative if not found', async () => {
        const mockSubcorporative: CorporativeExternalConnectionModel = {
            corporativeId: 'corporative-id',
            corporativeExternalKey: 'external-value',
            corporativeExternalOwner: 'external-owner'
        } as unknown as CorporativeExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockSubcorporative);

        const payload: CorporativeExternalSourceResolverPayload = {
            corporativeKey: 'external-value',
            owner: 'external-owner',
            corporativeName: 'corporative name',
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalKey', operator: 'eq', value: payload.corporativeKey },
            { field: 'corporativeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.corporativeKey,
            name: payload.corporativeName,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw CorporativeExternalKeyNotFoundError if corporative is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: CorporativeExternalSourceResolverPayload = {
            corporativeKey: 'external-value',
            owner: 'external-owner',
            corporativeName: 'corporative name',
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(CorporativeExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'corporativeExternalKey', operator: 'eq', value: payload.corporativeKey },
            { field: 'corporativeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.corporativeKey,
            name: payload.corporativeName,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
