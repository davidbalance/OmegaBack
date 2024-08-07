import { TestBed } from "@automock/jest";
import { BranchSelectorService } from "../branch-selector.service";
import { BranchRepository } from "../../repositories/branch.repository";
import { mockBranchSelectorOptions } from "./stub/branch-selector";

describe('BranchSelectorService', () => {
  let service: BranchSelectorService;
  let repository: jest.Mocked<BranchRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(BranchSelectorService).compile();

    service = unit;
    repository = unitRef.get(BranchRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const company: number = 1;
    const mockedBranchSelector = mockBranchSelectorOptions();

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockedBranchSelector),
      } as any);
    });

    it('should find selector options for a given company', async () => {
      // Arrange
      // Act
      const result = await service.find(company);

      // Assert
      expect(result).toEqual(mockedBranchSelector);
      expect(repository.query).toHaveBeenCalledWith('branch');
      expect(repository.query().select).toHaveBeenCalledWith('branch.id', 'key');
      expect(repository.query().addSelect).toHaveBeenCalledWith('branch.name', 'label');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('branch.company', 'company', 'company.id = :companyId', { companyId: company });
      expect(repository.query().getRawMany).toHaveBeenCalled();
    });
  });
});