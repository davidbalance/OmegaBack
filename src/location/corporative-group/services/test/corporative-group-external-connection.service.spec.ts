import { TestBed } from "@automock/jest";
import { CorporativeGroupRepository } from "../../repositories/corporative-group.repository";
import { CorporativeGroupExternalConnectionService } from "../corporative-group-external-connection.service";
import { CorporativeGroupExternalKeyService } from "../corporative-group-external-key.service";
import { mockCorporativeGroupExternalKey } from "./stub/corporative-group-external-key.stub";
import { mockCorporativeGroup } from "./stub/corporative-group.stub";
import { PatchExamRequestDto } from "@/laboratory/exam/dtos/request/patch.exam.request.dto";
import { NotFoundException } from "@nestjs/common";
import { PostCorporativeGroupRequestDto } from "../../dtos/request/post.corporative-group.dto";
import { PatchCorporativeGroupRequestDto } from "../../dtos/request/patch.corporative-group.dto";

describe('CorporativeGroupExternalConnectionService', () => {
    let service: CorporativeGroupExternalConnectionService;
    let repository: jest.Mocked<CorporativeGroupRepository>;
    let externalKeyService: jest.Mocked<CorporativeGroupExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CorporativeGroupExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(CorporativeGroupRepository);
        externalKeyService = unitRef.get(CorporativeGroupExternalKeyService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        const mockedKey = mockCorporativeGroupExternalKey();
        const mockedCorporativeGroup = mockCorporativeGroup();

        const key: string = 'my-test-key';
        const source: string = 'my-test-source';
        const mockDto: PostCorporativeGroupRequestDto = {
            name: "my-test-corporative-group"
        };

        it('should create an exam with a given key', async () => {
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedCorporativeGroup);

            const result = await service.create({ key, source }, mockDto);

            expect(result).toEqual(result);
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
        const mockedKey = mockCorporativeGroupExternalKey();
        const mockedCorporativeGroup = mockCorporativeGroup();

        const key: string = 'my-test-key';
        const source: string = 'my-test-source';
        const mockDto: PostCorporativeGroupRequestDto = {
            name: "my-test-corporative-group"
        };
        it('should find an existing exam and return it', async () => {
            repository.findOne.mockResolvedValueOnce(mockedCorporativeGroup);

            const result = await service.findOneOrCreate({ key, source }, mockDto);

            expect(result).toEqual(mockedCorporativeGroup);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { source: source, key: key } },
                    { name: mockDto.name }
                ]
            });
        });

        it('should not find exam so creates it', async () => {
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedCorporativeGroup);

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
        const mockedCorporativeGroup = mockCorporativeGroup();

        const key: string = 'my-test-key';
        const source: string = 'my-test-source';
        const mockDto: PatchCorporativeGroupRequestDto = {
            name: "my-test-corporative-group"
        };

        it('should update an existing exam', async () => {
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedCorporativeGroup);

            const result = await service.findOneAndUpdate({ key, source }, mockDto);

            expect(result).toEqual(mockedCorporativeGroup);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
                { externalKey: { key: key, source: source } },
                mockDto
            );
        });
    });
});
