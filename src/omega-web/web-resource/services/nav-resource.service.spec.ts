import { TestBed } from "@automock/jest";
import { WebResourceRespository } from "../repositories/web-resource.repository";
import { NavResourceService } from "./nav-resource.service";
import { mockWebResourceEntities } from "../stub/web-resource-entity.stub";

describe('NavResourceService', () => {
  let service: NavResourceService;
  let repository: jest.Mocked<WebResourceRespository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(NavResourceService).compile();

    service = unit;
    repository = unitRef.get(WebResourceRespository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should find all nav resources', async () => {
      // Arrange
      const mockedData = mockWebResourceEntities();
      repository.find.mockResolvedValue(mockedData);

      // Act
      const result = await service.findAll();

      // Assert
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          show: true,
          status: true
        }
      });
      expect(result).toEqual(mockedData);
    });
  });
});
