import { TestBed } from "@automock/jest";
import { CorporativeGroupRepository } from "../../repositories/corporative-group.repository";
import { CorporativeGroupManagementService } from "../corporative-group-management.service";
import { mockCorporativeGroup, mockCorporativeGroups } from "./stub/corporative-group.stub";
import { PostCorporativeGroupRequestDto } from "../../dtos/request/post.corporative-group.dto";

describe('CorporativeGroupManagementService', () => {
  let service: CorporativeGroupManagementService;
  let repository: jest.Mocked<CorporativeGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupManagementService).compile();

    service = unit;
    repository = unitRef.get(CorporativeGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const mockedGroup = mockCorporativeGroup();
    const body: PostCorporativeGroupRequestDto = {
      name: "Corporative name"
    }

    it('should create a corporative group', async () => {
      // Arrange
      repository.create.mockResolvedValueOnce(mockedGroup);

      // Act
      const result = await service.create(body);

      // Assert
      expect(result).toEqual(mockedGroup);
      expect(repository.create).toHaveBeenCalledWith(body);
    });
  });

  describe('find', () => {
    const mockedGroups = mockCorporativeGroups();

    it('should return all corporative groups', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedGroups);

      // Act
      const result = await service.find();

      // Assert
      expect(result).toEqual(mockedGroups);
      expect(repository.find).toHaveBeenCalledWith({
        where: { status: true },
        relations: { companies: { branches: { city: true } } }
      });
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedGroup = mockCorporativeGroup();

    it('should return a corporative group by id', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedGroup);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(mockedGroup);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id }, relations: { companies: { branches: true } } });
    });
  });

  describe('updateOne', () => {
    const id: number = 1;
    const mockedGroup = mockCorporativeGroup();
    const body: PostCorporativeGroupRequestDto = {
      name: "Updated corporative group name"
    }

    it('should update a corporative group', async () => {
      // Arrange
      repository.findOneAndUpdate.mockResolvedValueOnce(mockedGroup);

      // Act
      const result = await service.updateOne(id, body);

      // Assert
      expect(result).toEqual(mockedGroup);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith({ id }, body);
    });
  });

  describe('deleteOne', () => {
    const id: number = 1;

    it('should delete a corporative group', async () => {
      // Arrange
      repository.findOneAndDelete.mockResolvedValueOnce(undefined);

      // Act
      await service.deleteOne(id);

      // Assert
      expect(repository.findOneAndDelete).toHaveBeenCalledWith({ id });
    });
  });

});