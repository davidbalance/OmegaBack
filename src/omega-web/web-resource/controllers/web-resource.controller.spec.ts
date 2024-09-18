import { TestBed } from "@automock/jest";
import { WebResourceService } from "../services/web-resource.service";
import { WebResourceController } from "./web-resource.controller";
import { mockWebResource, mockWebResources } from "../stub/web-resource.stub";
import { PostWebResourceRequestDto } from "../dtos/request/web-resource.post.dto";
import { PatchWebResourceRequestDto } from "../dtos/request/web-resource.patch.dto";

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

  describe('find', () => {
    it('should find all resources', async () => {
      // Arrange
      const mockedData = mockWebResources();
      service.find.mockResolvedValue(mockedData);

      // Act
      const result = await controller.find();

      // Assert
      expect(service.find).toHaveBeenCalled();
      expect(result).toEqual({ data: mockedData });
    });
  });

  describe('findOne', () => {
    it('should find a resource by id', async () => {
      // Arrange
      const id = 1;
      const mockedData = mockWebResource();
      service.findOne.mockResolvedValue(mockedData);

      // Act
      const result = await controller.findOne(id);

      // Assert
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(result).toEqual(expect.objectContaining({
        ...mockedData
      }));
    });
  });

  describe('createResource', () => {
    it('should create a resource', async () => {
      // Arrange
      const mockDto: PostWebResourceRequestDto = {
        name: 'test',
        label: 'test',
        address: 'test',
        icon: 'test'
      };
      service.create.mockResolvedValue(undefined);

      // Act
      const result = await controller.createResource(mockDto);

      // Assert
      expect(service.create).toHaveBeenCalledWith(mockDto);
      expect(result).toEqual({});
    });
  });

  describe('updateResource', () => {
    it('should update a resource', async () => {
      // Arrange
      const id = 1;
      const mockDto: PatchWebResourceRequestDto = { name: 'updated resource' };
      service.updateOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.updateResource(id, mockDto);

      // Assert
      expect(service.updateOne).toHaveBeenCalledWith(id, mockDto);
      expect(result).toEqual({});
    });
  });

  describe('deleteResource', () => {
    it('should delete a resource', async () => {
      // Arrange
      const id = 1;
      service.deleteOne.mockResolvedValue(undefined);

      // Act
      const result = await controller.deleteResource(id);

      // Assert
      expect(service.deleteOne).toHaveBeenCalledWith(id);
      expect(result).toEqual({});
    });
  });

});