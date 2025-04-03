import { Test, TestingModule } from '@nestjs/testing';
import { BranchExternalSourceNestResolver } from '../branch-external-source.nest-resolver';
import { BranchExternalConnectionRepository } from '@omega/location/application/repository/model.repositories';
import { BranchCreateFromExternalSourceCommand } from '@omega/location/application/command/corporative/branch-create-from-external-source.command';
import { BranchCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { BranchExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { BranchExternalConnectionModel } from '@omega/location/core/models/corporative/branch-external-connection.model';
import { BranchExternalSourceResolverPayload } from '@omega/location/application/resolver/branch-external-source.resolver';
import { BranchExternalKeyNotFoundError } from '@omega/location/core/domain/corporative/errors/branch-external-key.errors';

describe('BranchExternalSourceNestResolver', () => {
    let resolver: BranchExternalSourceNestResolver;
    let externalConnection: jest.Mocked<BranchExternalConnectionRepository>;
    let createCommand: jest.Mocked<BranchCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<BranchExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<BranchCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                BranchExternalSourceNestResolver,
                { provide: BranchExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: BranchCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<BranchExternalSourceNestResolver>(BranchExternalSourceNestResolver);
    });

    it('should return an existing branch if found', async () => {
        const mockExam: BranchExternalConnectionModel = {
            branchId: 'branch-id',
            branchExternalKey: 'external-value',
            branchExternalOwner: 'external-owner'
        } as unknown as BranchExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockExam);

        const payload: BranchExternalSourceResolverPayload = {
            owner: 'external-owner',
            branchKey: 'branch-key',
            branchName: 'branch name',
            cityId: 78,
            companyId: 'company-id',
            corporativeId: 'corporative-id'
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalKey', operator: 'eq', value: payload.branchKey },
            { field: 'branchExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockExam);
    });

    it('should create an branch if not found', async () => {
        const mockExam: BranchExternalConnectionModel = {
            branchId: 'branch-id',
            branchExternalKey: 'external-value',
            branchExternalOwner: 'external-owner'
        } as unknown as BranchExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockExam);

        const payload: BranchExternalSourceResolverPayload = {
            owner: 'external-owner',
            branchKey: 'branch-key',
            branchName: 'branch name',
            cityId: 78,
            companyId: 'company-id',
            corporativeId: 'corporative-id'
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalKey', operator: 'eq', value: payload.branchKey },
            { field: 'branchExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.branchKey,
            cityId: payload.cityId,
            companyId: payload.companyId,
            corporativeId: payload.corporativeId,
            name: payload.branchName
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw BranchExternalKeyNotFoundError if branch is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: BranchExternalSourceResolverPayload = {
            owner: 'external-owner',
            branchKey: 'branch-key',
            branchName: 'branch name',
            cityId: 78,
            companyId: 'company-id',
            corporativeId: 'corporative-id'
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(BranchExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'branchExternalKey', operator: 'eq', value: payload.branchKey },
            { field: 'branchExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.branchKey,
            cityId: payload.cityId,
            companyId: payload.companyId,
            corporativeId: payload.corporativeId,
            name: payload.branchName
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
