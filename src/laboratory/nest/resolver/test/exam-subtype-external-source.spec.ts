import { Test, TestingModule } from '@nestjs/testing';
import { ExamSubtypeExternalConnectionRepository } from '@omega/laboratory/application/repository/model.repositories';
import { ExamSubtypeExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { ExamSubtypeCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { ExamSubtypeExternalSourceNestResolver } from '../exam-subtype-external-source.nest-resolver';
import { ExamSubtypeCreateFromExternalSourceCommand } from '@omega/laboratory/application/command/exam/exam-subtype-create-from-external-source.command';
import { ExamSubtypeExternalConnectionModel } from '@omega/laboratory/core/model/exam/exam-subtype-external-connection.model';
import { ExamSubtypeExternalSourceResolverPayload } from '@omega/laboratory/application/resolver/exam-subtype-external-source.resolver';
import { ExamSubtypeExternalKeyNotFoundError } from '@omega/laboratory/core/domain/exam/errors/exam-subtype-external-key.errors';

describe('ExamSubtypeExternalSourceNestResolver', () => {
    let resolver: ExamSubtypeExternalSourceNestResolver;
    let externalConnection: jest.Mocked<ExamSubtypeExternalConnectionRepository>;
    let createCommand: jest.Mocked<ExamSubtypeCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamSubtypeCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamSubtypeExternalSourceNestResolver,
                { provide: ExamSubtypeExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: ExamSubtypeCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<ExamSubtypeExternalSourceNestResolver>(ExamSubtypeExternalSourceNestResolver);
    });

    it('should return an existing exam if found', async () => {
        const mockSubtype: ExamSubtypeExternalConnectionModel = {
            examId: 'exam-id',
            subtypeExternalKey: 'external-value',
            subtypeExternalOwner: 'external-owner'
        } as unknown as ExamSubtypeExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockSubtype);

        const payload: ExamSubtypeExternalSourceResolverPayload = {
            subtypeKey: 'external-value',
            owner: 'external-owner',
            subtypeName: 'exam name',
            typeId: 'type-id'
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.subtypeKey },
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockSubtype);
    });

    it('should create an exam if not found', async () => {
        const mockSubtype: ExamSubtypeExternalConnectionModel = {
            examId: 'exam-id',
            subtypeExternalKey: 'external-value',
            subtypeExternalOwner: 'external-owner'
        } as unknown as ExamSubtypeExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockSubtype);

        const payload: ExamSubtypeExternalSourceResolverPayload = {
            subtypeKey: 'external-value',
            owner: 'external-owner',
            subtypeName: 'exam name',
            typeId: 'type-id'
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.subtypeKey },
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.subtypeKey,
            subtypeName: payload.subtypeName,
            typeId: payload.typeId,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw ExamSubtypeExternalKeyNotFoundError if exam is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: ExamSubtypeExternalSourceResolverPayload = {
            subtypeKey: 'external-value',
            owner: 'external-owner',
            subtypeName: 'exam name',
            typeId: 'type-id'
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(ExamSubtypeExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'subtypeExternalKey', operator: 'eq', value: payload.subtypeKey },
            { field: 'subtypeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.subtypeKey,
            subtypeName: payload.subtypeName,
            typeId: payload.typeId,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
