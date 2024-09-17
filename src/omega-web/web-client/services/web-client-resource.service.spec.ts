import { WebResourceService } from "@/omega-web/web-resource/services/web-resource.service";
import { WebClientRepository } from "../repositories/web-client.repository";
import { WebClientResourceService } from "./web-client-resource.service";
import { TestBed } from "@automock/jest";
import { mockWebClientEntity } from "../stub/web-client-entity.stub";
import { mockWebResources } from "@/omega-web/web-resource/stub/web-resource.stub";

describe('WebClientResourceService', () => {
  let service: WebClientResourceService;
  let repository: jest.Mocked<WebClientRepository>;
  let resourceService: jest.Mocked<WebResourceService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebClientResourceService).compile();

    service = unit;
    repository = unitRef.get(WebClientRepository);
    resourceService = unitRef.get(WebResourceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should find resources', async () => {
      // Arrange
      const userId = 1;
      const mockedData = mockWebClientEntity();
      repository.findOne.mockResolvedValue(mockedData);

      // Act
      const result = await service.find(userId);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { user: userId },
        select: {
          resources: { id: true, label: true }
        }
      });
      expect(result).toEqual(mockedData.resources);
    });
  });

  describe('updateResources', () => {
    it('should update resources', async () => {
      // Arrange
      const userId = 1;
      const resourceIds = [1, 2, 3];
      const mockedResources = mockWebResources();
      resourceService.findInIds.mockResolvedValue(mockedResources);

      // Act
      await service.updateResources(userId, { resources: resourceIds });

      // Assert
      expect(resourceService.findInIds).toHaveBeenCalledWith(resourceIds);
      expect(repository.findOneAndUpdate).toHaveBeenCalledWith(
        { user: userId },
        { resources: mockedResources }
      );
    });
  })
});
