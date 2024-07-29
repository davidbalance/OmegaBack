import { ExamTypeManagementService } from "@/laboratory/exam-type/services/exam-type-management.service";
import { ExamSubtypeRepository } from "../../repositories/exam-subtype.repository";
import { ExamSubtypeExternalConnectionService } from "../exam-subtype-external-connection.service";
import { ExamSubtypeExternalKeyService } from "../exam-subtype-external-key.service";
import { TestBed } from "@automock/jest";
import { mockExamSubtypeExternalKey } from "./stub/exam-subtype-external-key.stub";
import { mockExamType } from "@/laboratory/exam-type/services/test/stub/exam-type.stub";
import { mockExamsSubtype } from "./stub/exam-subtype.stub";
import { PostExamSubtypeRequestDto } from "../../dtos/request/post.exam-subtype.dto";
import { NotFoundException } from "@nestjs/common";
import { PatchExamSubtypeExternalRequestDto } from "../../dtos/request/patch.exam-subtype-external.dto";

describe('ExamSubtypeExternalConnectionService', () => {
    let service: ExamSubtypeExternalConnectionService;
    let repository: jest.Mocked<ExamSubtypeRepository>;
    let externalKeyService: jest.Mocked<ExamSubtypeExternalKeyService>;
    let typeService: jest.Mocked<ExamTypeManagementService>

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

    describe('findOne', () => {
        it('should throw an error when findOne is called', async () => {
            // Arrange
            const key = {}; // You can adjust this to be any value since it's not used in this case

            // Act & Assert
            await expect(service.findOne(key)).rejects.toThrow('Method not implemented.');
        });
    });

    describe('create', () => {
        const mockedKey = mockExamSubtypeExternalKey();
        const mockedExamType = mockExamType();
        const mockedExamSubtype = mockExamsSubtype();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostExamSubtypeRequestDto = {
            name: "my-test-exam",
            type: 0
        };

        it('should create an exam with a given key with given subtype', async () => {
            typeService.findOne.mockResolvedValueOnce(mockedExamType);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExamSubtype);

            const { type, ...testData } = mockDto;

            const result = await service.create({ key, source }, mockDto);

            expect(result).toEqual(mockedExamSubtype);
            expect(typeService.findOne).toHaveBeenCalledWith(mockDto.type);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...testData, externalKey: mockedKey, type: mockedExamType });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should returns an undefined type so throws NotFoundException', async () => {
            typeService.findOne.mockResolvedValueOnce(undefined);

            const { type, ...testData } = mockDto;

            await expect(service.create({ key, source }, mockDto))
                .rejects
                .toThrow(NotFoundException);

            expect(typeService.findOne).toHaveBeenCalledWith(mockDto.type);
            expect(externalKeyService.create).toHaveBeenCalledTimes(0);
            expect(repository.create).toHaveBeenCalledTimes(0);
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should throw an error so not create the exam', async () => {
            typeService.findOne.mockResolvedValueOnce(mockedExamType);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            const { type, ...testData } = mockDto;

            await expect(service.create({ key, source }, mockDto))
                .rejects
                .toThrow(Error);
            expect(typeService.findOne).toHaveBeenCalledWith(type);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...testData, externalKey: mockedKey, type: mockedExamType });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ source, key });
        });
    });

    describe('findOneOrCreate', () => {
        const mockedKey = mockExamSubtypeExternalKey();
        const mockedExamType = mockExamType();
        const mockedExamSubtype = mockExamsSubtype();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostExamSubtypeRequestDto = {
            name: "my-test-exam",
            type: 0
        };


        it('should find an existing exam and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedExamSubtype);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedExamSubtype);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    {
                        type: { id: mockDto.type },
                        name: mockDto.name
                    }
                ]
            });
        });

        it('should not find exam so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            typeService.findOne.mockResolvedValueOnce(mockedExamType);
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExamSubtype);

            const { type, ...testData } = mockDto;

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedExamSubtype);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    {
                        type: { id: mockDto.type },
                        name: mockDto.name
                    }
                ]
            });
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    {
                        type: { id: mockDto.type },
                        name: mockDto.name
                    }
                ]
            });
            expect(typeService.findOne).toHaveBeenCalledWith(mockDto.type);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...testData, externalKey: mockedKey, type: mockedExamType });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });
    });

    describe('findOneAndUpdate', () => {
        const mockedExamSubtype = mockExamsSubtype();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PatchExamSubtypeExternalRequestDto = {
            name: "my-test-exam"
        };

        it('should update an existing exam', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedExamSubtype);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedExamSubtype);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: { key, source } }, mockDto);
        });
    });
});
