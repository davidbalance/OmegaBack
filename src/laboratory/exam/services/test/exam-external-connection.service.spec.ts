import { TestBed } from "@automock/jest";
import { ExamRepository } from "../../repositories/exam.repository";
import { ExamExternalConnectionService } from "../exam-external-connection.service";
import { ExamExternalKeyService } from "../exam-external-key.service";
import { mockExamExternalKey } from "./stub/exam-external-key.stub";
import { mockExam } from "./stub/exam.stub";
import { NotFoundException } from "@nestjs/common";
import { PostExamExternalRequestDto } from "../../dtos/request/post.exam-external.request.dto";
import { mockExamType } from "@/laboratory/exam-type/services/test/stub/exam-type.stub";
import { PostExamSubtypeRequestDto } from "@/laboratory/exam-subtype/dtos/request/post.exam-subtype.dto";
import { ExamSubtype } from "@/laboratory/exam-subtype/entities/exam-subtype.entity";
import { PostExamTypeRequestDto } from "@/laboratory/exam-type/dtos/request/post.exam-type.dto";
import { IExternalConnectionService } from "@/shared/utils/bases/base.external-connection";
import { INJECT_EXAM_SUBTYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-subtype/services/exam-subtype-external-connection.service";
import { INJECT_EXAM_TYPE_EXTERNAL_CONNECTION } from "@/laboratory/exam-type/services/exam-type-external-connection.service";
import { ExamType } from "@/laboratory/exam-type/entities/exam-type.entity";
import { PatchExamRequestDto } from "../../dtos/request/patch.exam.request.dto";
import { mockExamsSubtype } from "@/laboratory/exam-subtype/services/test/stub/exam-subtype.stub";
import { PatchExamExternalRequestDto } from "../../dtos/request/patch.exam-external.request.dto";

describe('ExamExternalConnectionService', () => {
    let service: ExamExternalConnectionService;
    let repository: jest.Mocked<ExamRepository>;
    let externalKeyService: jest.Mocked<ExamExternalKeyService>;
    let subtypeService: jest.Mocked<IExternalConnectionService<PostExamSubtypeRequestDto, ExamSubtype>>
    let typeService: jest.Mocked<IExternalConnectionService<PostExamTypeRequestDto, ExamType>>

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

    describe('findOne', () => {

        it('should throw an error when findOne is called', async () => {
            // Arrange
            const key = {};

            // Act & Assert
            await expect(service.findOne(key)).rejects.toThrow('Method not implemented.');
        });
    });

    describe('create', () => {
        const mockedKey = mockExamExternalKey();
        const mockedExam = mockExam();
        const mockedExamType = mockExamType();
        const mockedExamSubtype = mockExamsSubtype();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostExamExternalRequestDto = {
            name: "my-test-exam",
            type: {
                key: 'my-test-exam-type-key',
                name: mockedExamType.name
            },
            subtype: {
                key: 'my-test-exam-subtype-key',
                name: mockedExamSubtype.name

            }
        };

        it('should create an exam with a given key with given subtype', async () => {
            typeService.findOneOrCreate.mockResolvedValueOnce(mockedExamType);
            subtypeService.findOneOrCreate.mockResolvedValueOnce(mockedExamSubtype);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExam);

            const { type, subtype, ...testData } = mockDto;
            const { key: examTypeKey, ...testType } = type;
            const { key: examSubtypeKey, ...testSubtype } = subtype;

            const result = await service.create({ key, source }, mockDto);

            expect(result).toEqual(result);
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ key: examTypeKey, source }, testType);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ key: examSubtypeKey, source }, { ...testSubtype, type: mockedExamType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...testData, externalKey: mockedKey, subtype: mockedExamSubtype });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should create an exam with a given key with not given found subtype', async () => {
            typeService.findOneOrCreate.mockResolvedValueOnce(mockedExamType);
            subtypeService.findOneOrCreate.mockResolvedValueOnce(mockedExamSubtype);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExam);

            const { type, subtype, ...testData } = mockDto;
            const { key: examTypeKey, ...testType } = type;
            const { key: examSubtypeKey, ...testSubtype } = subtype;

            const result = await service.create({ key, source }, { ...mockDto, subtype: undefined });

            expect(result).toEqual(result);
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ key: examTypeKey, source }, testType);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ key: source, source }, { name: 'default', type: mockedExamType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...testData, externalKey: mockedKey, subtype: mockedExamSubtype });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should throw an error so not create the exam', async () => {
            typeService.findOneOrCreate.mockResolvedValueOnce(mockedExamType);
            subtypeService.findOneOrCreate.mockResolvedValueOnce(mockedExamSubtype);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            const { type, subtype, ...testData } = mockDto;
            const { key: examTypeKey, ...testType } = type;
            const { key: examSubtypeKey, ...testSubtype } = subtype;

            await expect(service.create({ key, source }, mockDto))
                .rejects
                .toThrow(Error);
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ key: examTypeKey, source }, testType);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ key: examSubtypeKey, source }, { ...testSubtype, type: mockedExamType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...testData, externalKey: mockedKey, subtype: mockedExamSubtype });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ source, key });
        });
    });

    describe('findOneOrCreate', () => {
        const mockedKey = mockExamExternalKey();
        const mockedExam = mockExam();
        const mockedExamType = mockExamType();
        const mockedExamSubtype = mockExamsSubtype();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostExamExternalRequestDto = {
            name: "my-test-exam",
            type: {
                key: 'my-test-exam-type-key',
                name: mockedExamType.name
            },
            subtype: {
                key: 'my-test-exam-subtype-key',
                name: mockedExamSubtype.name

            }
        };

        it('should find an existing exam and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedExam);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedExam);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: { key: key, source: source } }
            });
        });

        it('should not find exam so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            typeService.findOneOrCreate.mockResolvedValueOnce(mockedExamType);
            subtypeService.findOneOrCreate.mockResolvedValueOnce(mockedExamSubtype);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExam);

            const { type, subtype, ...testData } = mockDto;
            const { key: examTypeKey, ...testType } = type;
            const { key: examSubtypeKey, ...testSubtype } = subtype;

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(result);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: { key: key, source: source } }
            });
            expect(typeService.findOneOrCreate).toHaveBeenCalledWith({ key: examTypeKey, source }, testType);
            expect(subtypeService.findOneOrCreate).toHaveBeenCalledWith({ key: examSubtypeKey, source }, { ...testSubtype, type: mockedExamType.id });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...testData, externalKey: mockedKey, subtype: mockedExamSubtype });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });
    });

    describe('findOneAndUpdate', () => {
        const mockedExam = mockExam();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PatchExamExternalRequestDto = {
            name: "my-test-exam"
        };

        it('should update an existing exam', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedExam);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedExam);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: { key, source } }, mockDto);
        });
    });
});
