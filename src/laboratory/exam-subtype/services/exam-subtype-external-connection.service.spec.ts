import { ExamTypeManagementService } from "@/laboratory/exam-type/services/exam-type-management.service";
import { mockExamType } from "@/laboratory/exam-type/stub/exam-type.stub";
import { TestBed } from "@automock/jest";
import { PostExamSubtypeRequestDto } from "../dtos/request/exam-subtype.post.dto";
import { PatchExamSubtypeExternalRequestDto } from "../dtos/request/external-exam-subtype.patch.dto";
import { ExamSubtypeRepository } from "../repositories/exam-subtype.repository";
import { mockExamSubtypeExternalKey } from "../stub/exam-subtype-external-key.stub";
import { mockExamSubtype } from "../stub/exam-subtype.stub";
import { ExamSubtypeExternalConnectionService } from "./exam-subtype-external-connection.service";
import { ExamSubtypeExternalKeyService } from "./exam-subtype-external-key.service";
import { mockExamSubtypeEntity } from "../stub/exam-subtype-entity.stub";

describe('ExamSubtypeExternalConnectionService', () => {
    let service: ExamSubtypeExternalConnectionService;
    let repository: jest.Mocked<ExamSubtypeRepository>;
    let externalKeyService: jest.Mocked<ExamSubtypeExternalKeyService>;
    let typeService: jest.Mocked<ExamTypeManagementService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamSubtypeExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(ExamSubtypeRepository);
        externalKeyService = unitRef.get(ExamSubtypeExternalKeyService);
        typeService = unitRef.get(ExamTypeManagementService);
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
        const data: PostExamSubtypeRequestDto = { type: 1, name: 'Test Subtype' };
        const keyParam = { source, key };
        const mockedType = mockExamType();
        const mockedKey = mockExamSubtypeExternalKey();
        const mockedExamSubtype = mockExamSubtypeEntity();
        const expectedValue = mockedExamSubtype;

        it('should create a new exam subtype', async () => {
            // Arrange
            typeService.findOne.mockResolvedValue(mockedType);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedExamSubtype);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            expect(typeService.findOne).toHaveBeenCalledWith(data.type);
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...data,
                externalKey: mockedKey,
                type: mockedType
            });
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if exam subtype creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');
            typeService.findOne.mockResolvedValue(mockedType);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            expect(typeService.findOne).toHaveBeenCalledWith(data.type);
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({
                ...data,
                externalKey: mockedKey,
                type: mockedType
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith(keyParam);
        });
    });

    describe('findOneOrCreate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PostExamSubtypeRequestDto = { type: 1, name: 'Test Subtype' };
        const keyParam = { source, key };
        const mockedExamSubtype = mockExamSubtypeEntity();
        const expectedValue = mockedExamSubtype;

        it('should find a exam subtype by external key or name', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedExamSubtype);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: keyParam },
                    {
                        type: { id: data.type },
                        name: data.name
                    }
                ]
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new exam subtype if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedExamSubtype);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: keyParam },
                    {
                        type: { id: data.type },
                        name: data.name
                    }
                ]
            });
            expect(service.create).toHaveBeenCalledWith(keyParam, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PatchExamSubtypeExternalRequestDto = { name: 'Updated Exam Subtype' };
        const keyParam = { source, key };
        const mockedExamSubtype = mockExamSubtypeEntity();
        const expectedValue = mockedExamSubtype;

        it('should update a exam subtype', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedExamSubtype);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    });
});
