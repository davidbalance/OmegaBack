import { TestBed } from "@automock/jest";
import { WebClientRepository } from "../repositories/web-client.repository";
import { WebClientService } from "./web-client.service";
import { mockWebClientEntity } from "../stub/web-client-entity.stub";

describe('WebClientService', () => {
  let service: WebClientService;
  let repository: jest.Mocked<WebClientRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebClientService).compile();

    service = unit;
    repository = unitRef.get(WebClientRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should find one', async () => {
      // Arrange
      const userId = 1;
      const mockedData = mockWebClientEntity();
      repository.findOne.mockResolvedValue(mockedData);

      // Act
      const result = await service.findOne(userId);

      // Assert
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { user: userId },
        select: {
          logo: { name: true },
          resources: { icon: true, label: true, address: true, }
        }
      });
      expect(result).toEqual(mockedData);
    });
  })
});