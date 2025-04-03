import { Test, TestingModule } from '@nestjs/testing';
import { ExamTypeExternalConnectionRepository } from '@omega/laboratory/application/repository/model.repositories';
import { ExamTypeExternalSourceNestResolver } from '../exam-type-external-source.nest-resolver';
import { ExamTypeCreateFromExternalSourceCommand } from '@omega/laboratory/application/command/exam/exam-type-create-from-external-source.command';
import { ExamTypeExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { ExamTypeCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { ExamTypeExternalConnectionModel } from '@omega/laboratory/core/model/exam/exam-type-external-connection.model';
import { ExamTypeExternalSourceResolverPayload } from '@omega/laboratory/application/resolver/exam-type-external-source.resolver';
import { ExamTypeExternalKeyNotFoundError } from '@omega/laboratory/core/domain/exam/errors/exam-type-external-key.errors';

describe('ExamTypeExternalSourceNestResolver', () => {
    let resolver: ExamTypeExternalSourceNestResolver;
    let externalConnection: jest.Mocked<ExamTypeExternalConnectionRepository>;
    let createCommand: jest.Mocked<ExamTypeCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamTypeCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamTypeExternalSourceNestResolver,
                { provide: ExamTypeExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: ExamTypeCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<ExamTypeExternalSourceNestResolver>(ExamTypeExternalSourceNestResolver);
    });

    it('should return an existing exam if found', async () => {
        const mockSubtype: ExamTypeExternalConnectionModel = {
            examId: 'exam-id',
            typeExternalKey: 'external-value',
            typeExternalOwner: 'external-owner'
        } as unknown as ExamTypeExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockSubtype);

        const payload: ExamTypeExternalSourceResolverPayload = {
            typeKey: 'external-value',
            owner: 'external-owner',
            typeName: 'exam name',
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalKey', operator: 'eq', value: payload.typeKey },
            { field: 'typeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockSubtype);
    });

    it('should create an exam if not found', async () => {
        const mockSubtype: ExamTypeExternalConnectionModel = {
            examId: 'exam-id',
            typeExternalKey: 'external-value',
            typeExternalOwner: 'external-owner'
        } as unknown as ExamTypeExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockSubtype);

        const payload: ExamTypeExternalSourceResolverPayload = {
            typeKey: 'external-value',
            owner: 'external-owner',
            typeName: 'exam name',
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalKey', operator: 'eq', value: payload.typeKey },
            { field: 'typeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.typeKey,
            name: payload.typeName,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw ExamTypeExternalKeyNotFoundError if exam is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: ExamTypeExternalSourceResolverPayload = {
            typeKey: 'external-value',
            owner: 'external-owner',
            typeName: 'exam name',
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(ExamTypeExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'typeExternalKey', operator: 'eq', value: payload.typeKey },
            { field: 'typeExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.typeKey,
            name: payload.typeName,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
