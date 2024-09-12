import { PostExamSubtypeRequestDto } from "@/laboratory/exam-subtype/dtos/request/exam-subtype.post.dto";
import { ExtendedExamSubtype } from "@/laboratory/exam-subtype/dtos/response/extended-exam-subtype.base.dto";
import { PostExamTypeRequestDto } from "@/laboratory/exam-type/dtos/request/exam-type.post.dto";
import { ExtendedExamType } from "@/laboratory/exam-type/dtos/response/extended-exam-type.base.dto";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { TestBed } from "@automock/jest";
import { PatchExamExternalRequestDto } from "../dtos/request/external-exam.patch.dto";
import { PostExamExternalRequestDto } from "../dtos/request/external-exam.post.dto";
import { ExamRepository } from "../repositories/exam.repository";
import { mockExamExternalKey } from "../stub/exam-external-key.stub";
import { mockExam } from "../stub/exam.stub";
import { ExamExternalConnectionService } from "./exam-external-connection.service";
import { ExamExternalKeyService } from "./exam-external-key.service";
import { INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-subtype/services/exam-subtype-external-connection.service";
import { INJECT_EXAM_TYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-type/services/exam-type-external-connection.service";
import { mockExtendedExamType } from "@/laboratory/exam-type/stub/extended-exam-type.stub";
import { mockExtendedExamSubtype } from "@/laboratory/exam-subtype/stub/extended-exam-subtype.stub";

describe('ExamExternalConnectionService', () => {
    let service: ExamExternalConnectionService;
    let repository: jest.Mocked<ExamRepository>;
    let externalKeyService: jest.Mocked<ExamExternalKeyService>;
    let subtypeService: jest.Mocked<IExternalConnectionService<PostExamSubtypeRequestDto, ExtendedExamSubtype>>;
    let typeService: jest.Mocked<IExternalConnectionService<PostExamTypeRequestDto, ExtendedExamType>>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(ExamRepository);
        externalKeyService = unitRef.get(ExamExternalKeyService);
        subtypeService = unitRef.get(INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION);
        typeService = unitRef.get(INJECT_EXAM_TYPE_EXTERNAL_CONNECTION);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('findOne', async () => {
        expect(service.findOne).toBeDefined()
    });

    describe('create', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const typeData: PostExamTypeRequestDto = { name: 'Test Type' };
        const subtypeData: PostExamSubtypeRequestDto = { name: 'Test Subtype', type: 1 };
        const data: PostExamExternalRequestDto = {
            type: { key: 'test-type-key', ...typeData },
            subtype: { key: 'test-subtype-key', ...subtypeData },
            name: 'Test Exam'
        };
        const keyParam = { source, key };
        const mockedType = mockExtendedExamType();
        const mockedSubtype = mockExtendedExamSubtype();
        const mockedKey = mockExamExternalKey();
        const mockedExam = mockExam();
        const expectedValue = mockedExam;

        it('should create a new exam with subtype', async () => {
            // Arrange
            typeService.findOneOrCreate.mockResolvedValue(mockedType);
            subtypeService.findOneOrCreate.mockResolvedValue(mockedSubtype);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedExam);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: data.type.key }, typeData);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: data.subtype.key }, { ...subtypeData, type: mockedType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            const { subtype, type, ...expectedData } = data;
            expect(repository.create).toHaveBeenCalledWith({
                ...expectedData,
                externalKey: mockedKey,
                subtype: { id: mockedSubtype.id }
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new exam without subtype', async () => {
            // Arrange
            typeService.findOneOrCreate.mockResolvedValue(mockedType);
            subtypeService.findOneOrCreate.mockResolvedValue(mockedSubtype);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedExam);
            const { subtype, ...dataWithoutSubtype } = data;
            // Act
            const result = await service.create(keyParam, dataWithoutSubtype);
            // Assert
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: data.type.key }, typeData);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: keyParam.source }, { ...subtypeData, name: 'default', type: mockedType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            const { type, ...expectedData } = dataWithoutSubtype;
            expect(repository.create).toHaveBeenCalledWith({
                ...expectedData,
                externalKey: mockedKey,
                subtype: { id: mockedSubtype.id }
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new exam', async () => {
            // Arrange
            typeService.findOneOrCreate.mockResolvedValue(mockedType);
            subtypeService.findOneOrCreate.mockResolvedValue(mockedSubtype);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedExam);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: data.type.key }, typeData);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: data.subtype.key }, { ...subtypeData, type: mockedType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            const { subtype, type, ...expectedData } = data;
            expect(repository.create).toHaveBeenCalledWith({
                ...expectedData,
                externalKey: mockedKey,
                subtype: { id: mockedSubtype.id }
            });
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if exam creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');
            typeService.findOneOrCreate.mockResolvedValue(mockedType);
            subtypeService.findOneOrCreate.mockResolvedValue(mockedSubtype);
            externalKeyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: data.type.key }, typeData);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ ...keyParam, key: data.subtype.key }, { ...subtypeData, type: mockedType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith(keyParam);
            const { subtype, type, ...expectedData } = data;
            expect(repository.create).toHaveBeenCalledWith({
                ...expectedData,
                externalKey: mockedKey,
                subtype: { id: mockedSubtype.id }
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith(keyParam);
        });
    });

    describe('findOneOrCreate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PostExamExternalRequestDto = {
            name: "Test exam",
            type: {
                key: "test-exam-type",
                name: "Test type"
            },
        };
        const keyParam = { source, key };
        const mockedExam = mockExam();
        const expectedValue = mockedExam;

        it('should find a exam by external key', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedExam);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: keyParam }
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new exam if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValue(new Error('Not found'));
            jest.spyOn(service, 'create').mockResolvedValue(mockedExam);
            // Act
            const result = await service.findOneOrCreate(keyParam, data);
            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: keyParam }
            });
            expect(service.create).toHaveBeenCalledWith(keyParam, data);
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source: string = 'test-source'
        const key = 'test-key';
        const data: PatchExamExternalRequestDto = { name: 'Updated Exam' };
        const keyParam = { source, key };
        const mockedExam = mockExam();
        const expectedValue = mockedExam;

        it('should update a exam', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedExam);
            // Act
            const result = await service.findOneAndUpdate(keyParam, data);
            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    });
});