import { TestBed } from "@automock/jest";
import { ManagementOptionService } from "../services/management-option.service";
import { ManagementOptionController } from "./management-option.controller";
import { mockExtendedManagements } from "../stub/extended-management.stub";

describe('ManagementOptionController', () => {
    let controller: ManagementOptionController;
    let service: jest.Mocked<ManagementOptionService>;
  
    beforeEach(async () => {
      const { unit, unitRef } = TestBed.create(ManagementOptionController).compile();
      controller = unit;
      service = unitRef.get(ManagementOptionService);
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    describe('find', () => {
  
      const mockedManagement = mockExtendedManagements();
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