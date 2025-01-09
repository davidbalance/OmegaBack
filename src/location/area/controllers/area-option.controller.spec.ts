import { TestBed } from "@automock/jest";
import { AreaOptionService } from "../services/area-option.service";
import { AreaOptionController } from "./area-option.controller";
import { mockExtendedAreas } from "../stub/extended-area.stub";

describe('AreaOptionController', () => {
  let controller: AreaOptionController;
  let service: jest.Mocked<AreaOptionService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(AreaOptionController).compile();
    controller = unit;
    service = unitRef.get(AreaOptionService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {

    const mockedManagement = mockExtendedAreas();
    const expectedData = { data: mockedManagement };

    it('should call the service to find all the options', async () => {
      // Arrange
      service.find.mockResolvedValue(mockedManagement);

      // Act
      const result = await controller.find();

      // Assert
      expect(result).toEqual(expectedData);
    });
  });
});