import { TestBed } from "@automock/jest";
import { NavResourceService } from "../services/nav-resource.service";
import { NavResourceController } from "./nav-resource.controller";
import { GetNavResourceArrayResponseDto } from "../dtos/response/get.nav-resource-array.response.dto";

describe('NavResourceController', () => {
  let controller: NavResourceController;
  let service: jest.Mocked<NavResourceService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(NavResourceController).compile();

    controller = unit;
    service = unitRef.get(NavResourceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    const mockedData = []; // Replace with your mock data
    const expectedResult: GetNavResourceArrayResponseDto = { data: mockedData };

    it('should find all nav resources', async () => {
      // Arrange
      service.findAll.mockResolvedValue(mockedData);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});