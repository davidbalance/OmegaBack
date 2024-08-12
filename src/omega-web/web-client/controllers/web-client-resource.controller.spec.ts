import { TestBed } from "@automock/jest";
import { WebClientResourceService } from "../services/web-client-resource.service";
import { WebClientResourceController } from "./web-client-resource.controller";
import { GetNavResourceArrayResponseDto } from "@/omega-web/web-resource/dtos/response/get.nav-resource-array.response.dto";
import { PatchWebClientResourceRequestDto } from "../dtos/request/patch.web-client-resource.request.dto";

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

  describe('findOneWebResources', () => {
    const user: number = 1;
    const mockedData = [];
    const expectResult: GetNavResourceArrayResponseDto = { data: mockedData };

    it('should find one web resources', async () => {
      // Arrange
      service.findAll.mockResolvedValue(mockedData);

      // Act
      const result = await controller.findOneWebResources(user);

      // Assert
      expect(service.findAll).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectResult);
    });
  });

  describe('assignWebResourceToWebClient', () => {
    const user: number = 1;
    const mockDto: PatchWebClientResourceRequestDto = {
      resources: [1, 2, 3, 4, 5]
    };

    it('should assign web resources to web client', async () => {
      // Arrange
      service.updateResources.mockResolvedValue(undefined);

      // Act
      const result = await controller.assignWebResourceToWebClient(user, mockDto);

      // Assert
      expect(service.updateResources).toHaveBeenCalledWith(user, mockDto);
      expect(result).toEqual({});
    });
  });
});