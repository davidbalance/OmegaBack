import { Test, TestingModule } from '@nestjs/testing';
import { TestCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { TestExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { TestExternalSourceNestResolver } from '../test-external-source.nest-resolver';
import { TestExternalConnectionRepository } from '@omega/medical/application/repository/model.repositories';
import { TestCreateFromExternalSourceCommand } from '@omega/medical/application/commands/test/test-create-from-external-source.command';
import { TestExternalConnectionModel } from '@omega/medical/core/model/test/test-external-connection';
import { TestExternalSourceResolverPayload } from '@omega/medical/application/resolver/test-external-source.resolver';
import { TestExternalKeyNotFoundError } from '@omega/medical/core/domain/test/errors/test-external-key.errors';

describe('TestExternalSourceNestResolver', () => {
    let resolver: TestExternalSourceNestResolver;
    let externalConnection: jest.Mocked<TestExternalConnectionRepository>;
    let createCommand: jest.Mocked<TestCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<TestExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<TestCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TestExternalSourceNestResolver,
                { provide: TestExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: TestCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<TestExternalSourceNestResolver>(TestExternalSourceNestResolver);
    });

    it('should return an existing test if found', async () => {
        const mockExam: TestExternalConnectionModel = {
            testId: 'test-id',
            testExternalKey: 'external-value',
            testExternalOwner: 'external-owner'
        } as unknown as TestExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockExam);

        const payload: TestExternalSourceResolverPayload = {
            owner: 'external-owner',
            testKey: 'test-key',
            examName: 'exam name',
            examSubtype: 'exam subtype',
            examType: 'exam type',
            orderId: 'order-id'
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.testKey },
            { field: 'testExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockExam);
    });

    it('should create an test if not found', async () => {
        const mockExam: TestExternalConnectionModel = {
            testId: 'test-id',
            testExternalKey: 'external-value',
            testExternalOwner: 'external-owner'
        } as unknown as TestExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockExam);

        const payload: TestExternalSourceResolverPayload = {
            owner: 'external-owner',
            testKey: 'test-key',
            examName: 'exam name',
            examSubtype: 'exam subtype',
            examType: 'exam type',
            orderId: 'order-id'
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.testKey },
            { field: 'testExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            ...payload,
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.testKey,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw TestExternalKeyNotFoundError if test is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: TestExternalSourceResolverPayload = {
            owner: 'external-owner',
            testKey: 'test-key',
            examName: 'exam name',
            examSubtype: 'exam subtype',
            examType: 'exam type',
            orderId: 'order-id'
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(TestExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'testExternalKey', operator: 'eq', value: payload.testKey },
            { field: 'testExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            ...payload,
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.testKey,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
