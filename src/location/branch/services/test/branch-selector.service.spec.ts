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
    const group: number = 1;
    const mockedGroupSelector = mockBranchSelectorOptions();

    it('should create a disease', async () => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockedGroupSelector),
      } as any);

      const result = await service.find(group);

      expect(result).toEqual(mockedGroupSelector);
      expect(repository.query).toHaveBeenCalledWith('branch');
    });
  });
});