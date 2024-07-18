import { TestBed } from "@automock/jest";
import { ExamRepository } from "../../repositories/exam.repository";
import { ExamExternalConnectionService } from "../exam-external-connection.service";
import { ExamExternalKeyService } from "../exam-external-key.service";
import { mockExamExternalKey } from "./stub/exam-external-key.stub";
import { PATCHExamRequestDto, POSTExamRequestDto } from "../../dtos/patch.exam.dto";
import { mockExam } from "./stub/exam.stub";
import { ConflictException, NotFoundException } from "@nestjs/common";

describe('ExamExternalConnectionService', () => {
    let service: ExamExternalConnectionService;
    let repository: jest.Mocked<ExamRepository>;
    let externalKeyService: jest.Mocked<ExamExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(ExamRepository);
        externalKeyService = unitRef.get(ExamExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedKey = mockExamExternalKey();
        const mockedExam = mockExam();
        const source: string = 'source';
        const mockDto: POSTExamRequestDto = {
            key: "test-outbound-service",
            name: "my-test-exam"
        };

        it('should create an exam with a given key', async () => {
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExam);

            const result = await service.create({ ...mockDto, source });

            const { key, ...exam } = mockDto;

            expect(result).toEqual(result);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...exam, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should throw an error so not create the exam', async () => {
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            const { key, ...exam } = mockDto;

            await expect(service.create({ ...mockDto, source }))
                .rejects
                .toThrow(Error);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...exam, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ source, key });
        });
    });

    describe('findOneOrCreate', () => {
        const mockedKey = mockExamExternalKey();
        const mockedExam = mockExam();
        const source: string = 'source';
        const mockDto: POSTExamRequestDto = {
            key: "test-outbound-service",
            name: "my-test-exam"
        };

        it('should find an existing exam and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedExam);

            const result = await service.findOneOrCreate({ ...mockDto, source });

            const { key } = mockDto;
            expect(result).toEqual(mockedExam);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: { key: key, source: source } }
            });
        });

        it('should not find exam so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedExam);

            const result = await service.findOneOrCreate({ ...mockDto, source });

            const { key, ...exam } = mockDto;

            expect(result).toEqual(result);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: { externalKey: { key: key, source: source } }
            });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...exam, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });
    });

    describe('findOneAndUpdate', () => {
        const mockedExam = mockExam();
        const source: string = 'source';
        const key: string = 'key';
        const mockDto: PATCHExamRequestDto = {
            name: "my-test-exam"
        };

        it('should update an existing exam', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedExam);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedExam);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { externalKey: { key: key, source: source } },
                mockDto
            );
        });
    });
});
