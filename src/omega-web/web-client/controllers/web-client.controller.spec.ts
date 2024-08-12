import { TestBed } from "@automock/jest";
import { WebClientService } from "../services/web-client.service";
import { WebClientController } from "./web-client.controller";
import { mockWebClient } from "../services/tests/stub/web-client.stub";
import { GetWebClientResponseDto } from "../dtos/response/get.web-client.response.dto";

describe('WebClientController', () => {
  let controller: WebClientController;
  let service: jest.Mocked<WebClientService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebClientController).compile();

    controller = unit;
    service = unitRef.get(WebClientService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    const user: number = 1;
    const mockedWebClient = mockWebClient();
    const expectResult: GetWebClientResponseDto = mockedWebClient;

    it('should find one web client', async () => {
      // Arrange
      service.findOne.mockResolvedValue(mockedWebClient);

      // Act
      const result = await controller.findOne(user);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(user);
      expect(result).toEqual(expectResult);
    });
  });
});