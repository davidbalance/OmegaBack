import { TestBed } from "@automock/jest";
import { CorporativeGroupRepository } from "../repositories/corporative-group.repository";
import { CorporativeGroupExternalConnectionService } from "./corporative-group-external-connection.service";
import { mockCorporativeGroupExternalKey } from "../stub/corporative-group-external-key.stub";
import { mockCorporativeGroup } from "../stub/corporative-group.stub";
import { PostCorporativeGroupRequestDto } from "../dtos/request/corporative-group.post.dto";
import { CorporativeGroupExternalKeyService } from "./corporative-group-external-key.service";
import { NotFoundException } from "@nestjs/common";
import { PatchCorporativeGroupRequestDto } from "../dtos/request/corporative-group.patch.dto";

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
        const source: string = "test-source";
        const key: string = "test-key";
        const mockedKey = mockCorporativeGroupExternalKey();
        const mockedGroup = mockCorporativeGroup();
        const body: PostCorporativeGroupRequestDto = {
            name: "Corporative name",
        }

        it('should create a corporative group', async () => {
            // Arrange
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedGroup);

            // Act
            const result = await service.create({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedGroup);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...body,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).not.toHaveBeenCalled();
        });

        it('should throw an error if corporative group creation fails', async () => {
            // Arrange
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockRejectedValueOnce(new Error());

            // Act & Assert
            await expect(service.create({ key, source }, body))
                .rejects
                .toThrowError(Error);
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...body,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).toHaveBeenCalledWith({ key, source });
        });
    });

    describe('findOneOrCreate', () => {
        const source: string = "test-source";
        const key: string = "test-key";
        const mockedKey = mockCorporativeGroupExternalKey();
        const mockedGroup = mockCorporativeGroup();
        const body: PostCorporativeGroupRequestDto = {
            name: "Corporative name"
        }

        it('should return an existing corporative group', async () => {
            // Arrange
            repository.findOne.mockResolvedValueOnce(mockedGroup);

            // Act
            const result = await service.findOneOrCreate({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedGroup);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    { name: body.name }
                ]
            });
            expect(externalKeyService.create).not.toHaveBeenCalled();
            expect(repository.create).not.toHaveBeenCalled();
            expect(externalKeyService.remove).not.toHaveBeenCalled();
        });

        it('should create a new corporative group if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValueOnce(new NotFoundException());
            externalKeyService.create.mockResolvedValueOnce(mockedKey);
            repository.create.mockResolvedValueOnce(mockedGroup);

            // Act
            const result = await service.findOneOrCreate({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedGroup);
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [
                    { externalKey: { key, source } },
                    { name: body.name }
                ]
            });
            expect(externalKeyService.create).toHaveBeenCalledWith({ key, source });
            expect(repository.create).toHaveBeenCalledWith({
                ...body,
                externalKey: mockedKey
            });
            expect(externalKeyService.remove).not.toHaveBeenCalled();
        });
    });

    describe('findOneAndUpdate', () => {
        const key = 'test-key';
        const source = 'test-source';
        const mockedGroup = mockCorporativeGroup();
        const body: PatchCorporativeGroupRequestDto = {
            name: "Updated corporative group name"
        }

        it('should update an existing corporative group', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValueOnce(mockedGroup);

            // Act
            const result = await service.findOneAndUpdate({ key, source }, body);

            // Assert
            expect(result).toEqual(mockedGroup);
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: { key, source } }, body);
        });
    });
});
