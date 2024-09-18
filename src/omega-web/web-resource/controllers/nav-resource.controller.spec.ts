import { TestBed } from "@automock/jest";
import { NavResourceService } from "../services/nav-resource.service";
import { NavResourceController } from "./nav-resource.controller";
import { mockNavResources } from "../stub/nav-resource.stub";

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

  it('should find all nav resources', async () => {
    // Arrange
    const mockedData = mockNavResources();
    service.findAll.mockResolvedValue(mockedData);

    // Act
    const result = await controller.findAll();

    // Assert
    expect(service.findAll).toHaveBeenCalled();
    expect(result).toEqual({ data: mockedData });
  });
});