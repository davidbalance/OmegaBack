import { TestBed } from "@automock/jest";
import { PatchJobPositionRequestDto } from "../../dtos/request/patch.job-position.request.dto";
import { JobPositionRepository } from "../../repositories/job-position.repository";
import { JobPositionExternalConnectionService } from "../job-position-external-connection.service";
import { JobPositionExternalKeyService } from "../job-position-external-key.service";
import { mockJobPositionExternalKey } from "./stub/job-position-external-key.stub";
import { mockJobPosition } from "./stub/job-position.stub";
import { NotFoundException } from "@nestjs/common";
import { PostJobPositionRequestDto } from "../../dtos/request/post.job-position.request.dto";

describe('JobPositionExternalConnectionService', () => {
    let service: JobPositionExternalConnectionService;
    let repository: jest.Mocked<JobPositionRepository>;
    let externalKeyService: jest.Mocked<JobPositionExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(JobPositionRepository);
        externalKeyService = unitRef.get(JobPositionExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedKey = mockJobPositionExternalKey();
        const mockedJobPosition = mockJobPosition();

        const key: string = 'my-test-key';
        const source: string = 'my-test-source';
        const mockDto: PostJobPositionRequestDto = {
            name: "my-test-corporative-group",
        };

        it('should create an job position with a given key', async () => {
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedJobPosition);

            const result = await service.create({ key, source }, mockDto);

            expect(result).toEqual(result);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...mockDto, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });

        it('should throw an error so not create the job position', async () => {
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
        const mockedKey = mockJobPositionExternalKey();
        const mockedJobPosition = mockJobPosition();

        const key: string = 'my-test-key';
        const source: string = 'my-test-source';
        const mockDto: PostJobPositionRequestDto = {
            name: "my-test-corporative-group"
        };

        it('should find an existing job position and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedJobPosition);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedJobPosition);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { source, key } },
                    { name: mockDto.name }
                ]
            });
        });

        it('should not find job position so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedJobPosition);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(result);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { source, key } },
                    { name: mockDto.name }
                ]
            });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({ ...mockDto, externalKey: mockedKey });
            expect(externalKeyService.remove).toHaveBeenCalledTimes(0);
        });
    });

    describe('findOneAndUpdate', () => {
        const mockedJobPosition = mockJobPosition();
        const key: string = 'key';
        const source: string = 'source';
        const mockDto: PatchJobPositionRequestDto = {
            name: "my-test-corporative-group"
        };

        it('should update an existing job position', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedJobPosition);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedJobPosition);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { externalKey: { key: key, source: source } },
                mockDto
            );
        });
    });
});
