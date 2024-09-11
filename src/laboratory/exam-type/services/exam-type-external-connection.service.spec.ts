import { TestBed } from "@automock/jest";
import { PatchExamTypeRequestDto } from "../dtos/request/exam-type.patch.dto";
import { PostExamTypeRequestDto } from "../dtos/request/exam-type.post.dto";
import { ExamTypeRepository } from "../repositories/exam-type.repository";
import { mockExamTypeExternalKey } from "../stub/exam-type-external-key.stub";
import { mockExamType } from "../stub/exam-type.stub";
import { ExamTypeExternalConnectionService } from "./exam-type-external-connection.service";
import { ExamTypeExternalKeyService } from "./exam-type-external-key.service";
import { mockExamTypeEntity } from "../stub/exam-type-entity.stub";

describe('ExamTypeExternalConnectionService', () => {
    let service: ExamTypeExternalConnectionService;
    let repository: jest.Mocked<ExamTypeRepository>;
    let externalKeyService: jest.Mocked<ExamTypeExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamTypeExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(ExamTypeRepository);
        externalKeyService = unitRef.get(ExamTypeExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('findOne', async () => {
        expect(service.findOne).toBeDefined()
    });

    describe('create', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PostExamTypeRequestDto = { name: 'Test Type' };
        const keyParam = { source, key };
        const mockedKey = mockExamTypeExternalKey();
        const mockedExamType = mockExamTypeEntity();
        const expectedValue = mockedExamType;

        it('should create a new exam type', async () => {
            // Arrange
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedExamType);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...data,
                externalKey: mockedKey
            });
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if exam type creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...data,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith(keyParam);
        });
    });

    describe('findOneOrCreate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PostExamTypeRequestDto = { name: 'Test Type' };
        const keyParam = { source, key };
        const mockedExamType = mockExamTypeEntity();
        const expectedValue = mockedExamType;

        it('should find a exam type by external key or name', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedExamType);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: keyParam },
                    { name: data.name }
                ]
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new exam type if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedExamType);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: keyParam },
                    { name: data.name }
                ]
            });
            expect(service.create).toHaveBeenCalledWith(keyParam, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PatchExamTypeRequestDto = { name: 'Updated Exam Type' };
        const keyParam = { source, key };
        const mockedExamType = mockExamTypeEntity();
        const expectedValue = mockedExamType;

        it('should update a exam type', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedExamType);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    });
});
