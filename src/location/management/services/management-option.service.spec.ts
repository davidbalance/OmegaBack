import { TestBed } from "@automock/jest";
import { ManagementRepository } from "../repositories/management.repository";
import { mockManagementEntities } from "../stub/management-entity.stub";
import { ManagementOptionService } from "./management-option.service";

describe('ManagementOptionService', () => {
  let service: ManagementOptionService;
  let repository: jest.Mocked<ManagementRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ManagementOptionService).compile();

    service = unit;
    repository = unitRef.get(ManagementRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });


  describe('find', () => {
    it('should return an array of ExtendedManagement', async () => {
      // Arrange
      const mockedData = mockManagementEntities();
      repository.find.mockResolvedValue(mockedData);

      // Act
      const result = await service.find();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: { status: true },
        relations: { areas: true },
      });
      expect(result).toEqual(mockedData);
    });
  });
});