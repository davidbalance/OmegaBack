import { TestBed } from "@automock/jest";
import { BranchPaginationService } from "../services/branch-pagination.service";
import { BranchPaginationController } from "./branch-pagination.controller";
import { FilterMetaDto } from "@/shared/utils/bases/base.pagination.dto";
import { mockBranches } from "../stub/branch.stub";

describe('BranchPaginationController', () => {
    let controller: BranchPaginationController;
    let service: jest.Mocked<BranchPaginationService>;
  
    beforeEach(async () => {
      const { unit, unitRef } = TestBed.create(BranchPaginationController).compile();
      controller = unit;
      service = unitRef.get(BranchPaginationService);
    });
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('find', () => {
      const subtype: number = 1;
      const query: FilterMetaDto = { page: 0, take: 100 }
      const mockedBranches = mockBranches();
      const expectedData = { data: mockedBranches };
  
      it('should call the service to find an exam subtype', async () => {
        // Arrange
        service.find.mockResolvedValue(mockedBranches);
  
        // Act
        const result = await controller.find(subtype, query);
  
        // Assert
        expect(service.find).toHaveBeenCalledWith(query, subtype);
        expect(result).toEqual(expectedData);
      });
    });
  
    describe('count', () => {
      const subtype: number = 1;
      const query: FilterMetaDto = { page: 0, take: 100 }
      const mockedCount: number = 1;
      const expectedData = { pages: mockedCount };
  
      it('should call the service to count exam subtypes', async () => {
        // Arrange
        service.count.mockResolvedValue(mockedCount);
  
        // Act
        const result = await controller.count(subtype, query);
  
        // Assert
        expect(service.count).toHaveBeenCalledWith(query, subtype);
        expect(result).toEqual(expectedData);
      });
    });
  });