import { TestBed } from "@automock/jest";
import { PatchExternalCorporativeGroupRequestDto } from "../dtos/request/external-corporative-group.patch.dto";
import { PostExternalCorporativeGroupRequestDto } from "../dtos/request/external-corporative-group.post.dto";
import { CorporativeGroupRepository } from "../repositories/corporative-group.repository";
import { CorporativeGroupExternalConnectionService } from "./corporative-group-external-connection.service";
import { CorporativeGroupExternalKeyService } from "./corporative-group-external-key.service";
import { ExternalKeyParam } from "@/shared/utils/bases/base.external-connection";
import { mockCorporativeGroupExternalKey } from "../stub/corporative-group-external-key.stub";
import { mockCorporativeGroupEntity } from "../stub/corporative-group-entity.stub";

describe('CorporativeGroupExternalConnectionService', () => {
    let service: CorporativeGroupExternalConnectionService;
    let repository: jest.Mocked<CorporativeGroupRepository>;
    let keyService: jest.Mocked<CorporativeGroupExternalKeyService>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CorporativeGroupExternalConnectionService).compile();

        service = unit;
        repository = unitRef.get(CorporativeGroupRepository);
        keyService = unitRef.get(CorporativeGroupExternalKeyService);
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
        const data: PostExternalCorporativeGroupRequestDto = { name: 'Test Group' };
        const keyParam: ExternalKeyParam = { source, key };
        const mockedKey = mockCorporativeGroupExternalKey();
        const mockedGroup = mockCorporativeGroupEntity();
        const expectedValue = mockedGroup;

        it('should create a new corporative group', async () => {
            // Arrange
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedGroup);
            // Act
            const result = await service.create(keyParam, data);
            // Assert
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({ ...data, externalKey: mockedKey });
            expect(result).toEqual(expectedValue);
        });

        it('should remove key and throw error if group creation fails', async () => {
            // Arrange
            const error = new Error('Creation failed');

            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockRejectedValue(error);
            // Act and Assert
            await expect(service.create(keyParam, data)).rejects.toThrowError(error);
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({ ...data, externalKey: mockedKey });
            expect(keyService.remove).toHaveBeenCalledWith(keyParam);
        });
    })

    describe('findOneOrCreate', () => {
        const key = 'test-key';
        const source = 'test-source'
        const data: PostExternalCorporativeGroupRequestDto = { name: 'Test Group' };
        const keyParam: ExternalKeyParam = { source, key };
        const mockedKey = mockCorporativeGroupExternalKey();
        const mockedGroup = mockCorporativeGroupEntity();
        const expectedValue = mockedGroup;

        it('should find a corporative group by external key or name', async () => {
            // Arrange
            repository.findOne.mockResolvedValue(mockedGroup);

            // Act
            const result = await service.findOneOrCreate(keyParam, data);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [{ externalKey: keyParam }, { name: data.name }]
            });
            expect(result).toEqual(expectedValue);
        });

        it('should create a new corporative group if not found', async () => {
            // Arrange
            repository.findOne.mockRejectedValue(new Error('Not found'));
            keyService.create.mockResolvedValue(mockedKey);
            repository.create.mockResolvedValue(mockedGroup);

            // Act
            const result = await service.findOneOrCreate(keyParam, data);

            // Assert
            expect(repository.findOne).toHaveBeenCalledWith({
                where: [{ externalKey: keyParam }, { name: data.name }]
            });
            expect(keyService.create).toHaveBeenCalledWith(keyParam);
            expect(repository.create).toHaveBeenCalledWith({ ...data, externalKey: mockedKey });
            expect(result).toEqual(expectedValue);
        });
    });

    describe('findOneAndUpdate', () => {
        const source = 'test-source'
        const key = 'test-key';
        const keyParam: ExternalKeyParam = { key, source };
        const data: PatchExternalCorporativeGroupRequestDto = { name: 'Updated Group' };
        const mockedGroup = mockCorporativeGroupEntity();
        const expectedValue = mockedGroup;

        it('should update a corporative group', async () => {
            // Arrange
            repository.findOneAndUpdate.mockResolvedValue(mockedGroup);

            // Act
            const result = await service.findOneAndUpdate(keyParam, data);

            // Assert
            expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ externalKey: keyParam }, data);
            expect(result).toEqual(expectedValue);
        });
    })
});
