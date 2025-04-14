import { Test, TestingModule } from '@nestjs/testing';
import { ExamExternalSourceNestResolver } from '../exam-external-source.nest-resolver';
import { ExamExternalConnectionRepository } from '@omega/laboratory/application/repository/model.repositories';
import { ExamCreateFromExternalSourceCommand } from '@omega/laboratory/application/command/exam/exam-create-from-external-source.command';
import { ExamExternalConnectionModelRepositoryToken } from '../../inject/model-repository.inject';
import { ExamCreateFromExternalSourceCommandToken } from '../../inject/command.inject';
import { ExamExternalSourceResolverPayload } from '@omega/laboratory/application/resolver/exam-external-source.resolver';
import { ExamExternalConnectionModel } from '@omega/laboratory/core/model/exam/exam-external-connection.model';
import { ExamExternalKeyNotFoundError } from '@omega/laboratory/core/domain/exam/errors/exam-external-key.errors';

describe('ExamExternalSourceNestResolver', () => {
    let resolver: ExamExternalSourceNestResolver;
    let externalConnection: jest.Mocked<ExamExternalConnectionRepository>;
    let createCommand: jest.Mocked<ExamCreateFromExternalSourceCommand>;

    beforeEach(async () => {
        externalConnection = {
            findOneAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamExternalConnectionRepository>;

        createCommand = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ExamCreateFromExternalSourceCommand>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExamExternalSourceNestResolver,
                { provide: ExamExternalConnectionModelRepositoryToken, useValue: externalConnection },
                { provide: ExamCreateFromExternalSourceCommandToken, useValue: createCommand },
            ],
        }).compile();

        resolver = module.get<ExamExternalSourceNestResolver>(ExamExternalSourceNestResolver);
    });

    it('should return an existing exam if found', async () => {
        const mockExam: ExamExternalConnectionModel = {
            examId: 'exam-id',
            examExternalKey: 'external-value',
            examExternalOwner: 'external-owner'
        } as unknown as ExamExternalConnectionModel;

        externalConnection.findOneAsync.mockResolvedValue(mockExam);

        const payload: ExamExternalSourceResolverPayload = {
            examKey: 'external-value',
            owner: 'external-owner',
            examName: 'exam name',
            subtypeId: 'subtype-id',
            typeId: 'type-id'
        }

        const result = await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalKey', operator: 'eq', value: payload.examKey },
            { field: 'examExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).not.toHaveBeenCalled();
        expect(result).toEqual(mockExam);
    });

    it('should create an exam if not found', async () => {
        const mockExam: ExamExternalConnectionModel = {
            examId: 'exam-id',
            examExternalKey: 'external-value',
            examExternalOwner: 'external-owner'
        } as unknown as ExamExternalConnectionModel;

        externalConnection.findOneAsync
            .mockResolvedValueOnce(null)
            .mockResolvedValueOnce(mockExam);

        const payload: ExamExternalSourceResolverPayload = {
            examKey: 'external-value',
            owner: 'external-owner',
            examName: 'exam name',
            subtypeId: 'subtype-id',
            typeId: 'type-id'
        }

        await resolver.resolve(payload);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalKey', operator: 'eq', value: payload.examKey },
            { field: 'examExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.examKey,
            examName: payload.examName,
            typeId: payload.typeId,
            subtypeId: payload.subtypeId,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });

    it('should throw ExamExternalKeyNotFoundError if exam is not found after creation', async () => {
        externalConnection.findOneAsync.mockResolvedValue(null);
        createCommand.handleAsync.mockResolvedValue(undefined);

        const payload: ExamExternalSourceResolverPayload = {
            examKey: 'external-value',
            owner: 'external-owner',
            examName: 'exam name',
            subtypeId: 'subtype-id',
            typeId: 'type-id'
        }

        await expect(resolver.resolve(payload)).rejects
            .toThrow(ExamExternalKeyNotFoundError);

        expect(externalConnection.findOneAsync).toHaveBeenCalledWith([
            { field: 'examExternalKey', operator: 'eq', value: payload.examKey },
            { field: 'examExternalOwner', operator: 'eq', value: payload.owner },
        ]);
        expect(createCommand.handleAsync).toHaveBeenCalledWith({
            externalKeyOwner: payload.owner,
            externalKeyValue: payload.examKey,
            examName: payload.examName,
            typeId: payload.typeId,
            subtypeId: payload.subtypeId,
        });
        expect(externalConnection.findOneAsync).toHaveBeenCalledTimes(2);
    });
});
