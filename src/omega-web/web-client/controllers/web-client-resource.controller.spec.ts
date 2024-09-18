import { TestBed } from "@automock/jest";
import { WebClientResourceService } from "../services/web-client-resource.service";
import { WebClientResourceController } from "./web-client-resource.controller";
import { mockWebResources } from "@/omega-web/web-resource/stub/web-resource.stub";
import { PatchWebClientResourceRequestDto } from "../dtos/request/web-client-resource.patch.dto";

describe('WebClientResourceController', () => {
  let controller: WebClientResourceController;
  let service: jest.Mocked<WebClientResourceService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebClientResourceController).compile();

    controller = unit;
    service = unitRef.get(WebClientResourceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    it('should find resources by user token', async () => {
      // Arrange
      const userId = 1;
      const mockedData = mockWebResources();
      service.find.mockResolvedValue(mockedData);

      // Act
      const result = await controller.find(userId);

      // Assert
      expect(service.find).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ data: mockedData });
    });
  });

  describe('findResources', () => {
    it('should find resources by user id', async () => {
      // Arrange
      const userId = 1;
      const mockedData = mockWebResources();
      service.find.mockResolvedValue(mockedData);

      // Act
      const result = await controller.findResources(userId);

      // Assert
      expect(service.find).toHaveBeenCalledWith(userId);
      expect(result).toEqual({ data: mockedData });
    });
  });

  describe('assignWebResourceToWebClient', () => {
    it('should assign web resource to web client', async () => {
      // Arrange
      const userId = 1;
      const mockDto: PatchWebClientResourceRequestDto = { resources: [1] };
      service.updateResources.mockResolvedValue(undefined);

      // Act
      const result = await controller.assignWebResourceToWebClient(userId, mockDto);

      // Assert
      expect(service.updateResources).toHaveBeenCalledWith(userId, mockDto);
      expect(result).toEqual({});
    });
  })

});