import { TestBed } from "@automock/jest";
import { CompanyRepository } from "../../repositories/company.repository";
import { CompanySelectorService } from "../company-selector.service";
import { mockCompanySelectorOptions } from "./stub/company-selector";

describe('CompanySelectorService', () => {
  let service: CompanySelectorService;
  let repository: jest.Mocked<CompanyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CompanySelectorService).compile();

    service = unit;
    repository = unitRef.get(CompanyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const group: number = 1;
    const mockedGroupSelector = mockCompanySelectorOptions();

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
      expect(repository.query).toHaveBeenCalledWith('company');
    });
  });
});