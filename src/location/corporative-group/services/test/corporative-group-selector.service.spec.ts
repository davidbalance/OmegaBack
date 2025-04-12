import { TestBed } from "@automock/jest";
import { CorporativeGroupRepository } from "../../repositories/corporative-group.repository";
import { CorporativeGroupSelectorService } from "../corporative-group-selector.service";
import { mockCorporativeGroupSelectorOptions } from "./stub/corporative-group-selector.stub";

describe('CorporativeGroupSelectorService', () => {
  let service: CorporativeGroupSelectorService;
  let repository: jest.Mocked<CorporativeGroupRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CorporativeGroupSelectorService).compile();

    service = unit;
    repository = unitRef.get(CorporativeGroupRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const mockedGroupSelector = mockCorporativeGroupSelectorOptions();

    it('should create a disease', async () => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockedGroupSelector),
      } as any);

      const result = await service.find();

      expect(result).toEqual(mockedGroupSelector);
      expect(repository.query).toHaveBeenCalledWith('group');
    });
  });
});