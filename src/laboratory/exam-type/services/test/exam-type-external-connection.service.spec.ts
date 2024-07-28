import { TestBed } from "@automock/jest";
import { ExamTypeRepository } from "../../repositories/exam-type.repository";
import { ExamTypeExternalConnectionService } from "../exam-type-external-connection.service";
import { ExamTypeExternalKeyService } from "../exam-type-external-key.service";
import { mockExamTypeExternalKey } from "./stub/exam-type-external-key.stub";
import { mockExamType } from "./stub/exam-type.stub";
import { PostExamTypeRequestDto } from "../../dtos/request/post.exam-type.dto";
import { NotFoundException } from "@nestjs/common";
import { PatchExamTypeRequestDto } from "../../dtos/request/patch.exam-type.dto";

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

    describe('findOne', () => {
        it('should throw an error when findOne is called', async () => {
            // Arrange
            const key = {}; // You can adjust this to be any value since it's not used in this case

            // Act & Assert
            await expect(service.findOne(key)).rejects.toThrow('Method not implemented.');
        });
    })

    describe('create', () => {
        const mockedKey = mockExamTypeExternalKey();
        const mockedExamType = mockExamType();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostExamTypeRequestDto = {
            name: "my-test-exam"
        };

        it('should create an exam with a given key with given subtype', async () => {
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExamType);

            const result = await service.create({ key, source }, mockDto);

            expect(result).toEqual(mockedExamType);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...mockDto, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should throw an error so not create the exam', async () => {
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            await expect(service.create({ key, source }, mockDto))
                .rejects
                .toThrow(Error);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...mockDto, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ source, key });
        });
    });

    describe('findOneOrCreate', () => {
        const mockedKey = mockExamTypeExternalKey();
        const mockedExamType = mockExamType();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PostExamTypeRequestDto = {
            name: "my-test-exam"
        };


        it('should find an existing exam and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedExamType);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedExamType);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    { name: mockDto.name }
                ]
            });
        });

        it('should not find exam so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExamType);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedExamType);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    { name: mockDto.name }
                ]
            });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...mockDto, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });
    });

    describe('findOneAndUpdate', () => {
        const mockedExamType = mockExamType();

        const key: string = "my-test-key";
        const source: string = 'my-test-source';
        const mockDto: PatchExamTypeRequestDto = {
            name: "my-test-exam"
        };

        it('should update an existing exam', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedExamType);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedExamType);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: { key, source } }, mockDto);
        });
    });
});
