import { TestBed } from "@automock/jest";
import { WebResourceService } from "../services/web-resource.service";
import { WebResourceController } from "./web-resource.controller";
import { mockWebResource, mockWebResourceArray } from "../services/test/stub/web-resource.stub";
import { GetWebResourceArrayResponseDto } from "../dtos/response/get.web-resource-array.response.dto";
import { PostWebResourceRequestDto } from "../dtos/request/post.web-resource.request.dto";
import { PatchWebResourceRequestDto } from "../dtos/request/patch.web-resource.request.dto";

describe('WebResourceController', () => {
  let controller: WebResourceController;
  let service: jest.Mocked<WebResourceService>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(WebResourceController).compile();

    controller = unit;
    service = unitRef.get(WebResourceService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    const mockedData = mockWebResourceArray();
    const expectedResult: GetWebResourceArrayResponseDto = { data: mockedData };

    it('should find all web resources', async () => {
      // Arrange
      service.findAll.mockResolvedValue(mockedData);

      // Act
      const result = await controller.findAll();

      // Assert
      expect(service.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('createResource', () => {
    const mockDto: PostWebResourceRequestDto = {
      name: "Custom resource",
      label: "Custom label",
      address: "/path/to/resource",
      icon: "mocked-dto"
    };
    const mockedWebResource = mockWebResource();
    const expectedResult = mockedWebResource;

    it('should create a new web resource', async () => {
      // Arrange
      service.create.mockResolvedValue(mockedWebResource);

      // Act
      const result = await controller.createResource(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('updateResource', () => {
    const id: number = 1;
    const mockDto: PatchWebResourceRequestDto = {
      name: "Custom resource",
      label: "Custom label",
      address: "/path/to/resource",
      icon: "mocked-dto"
    };
    const mockedWebResource = mockWebResource();
    const expectedResult = mockedWebResource;

    it('should update a web resource', async () => {
      // Arrange
      service.updateOne.mockResolvedValue(mockedWebResource);

      // Act
      const result = await controller.updateResource(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('deleteResource', () => {
    const id: number = 1;

    it('should delete a web resource', async () => {
      // Arrange
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.deleteResource(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({});
    });
  });
});