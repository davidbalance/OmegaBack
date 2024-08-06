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
    const group: number = 2;
    const mockedCompanySelector = mockCompanySelectorOptions();

    beforeEach(() => {
      repository.query.mockReturnValue({
        select: jest.fn().mockReturnThis(),
        addSelect: jest.fn().mockReturnThis(),
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getRawMany: jest.fn().mockResolvedValueOnce(mockedCompanySelector),
      } as any);
    })

    it('should find selector options for a given group', async () => {
      // Arrange
      // Act
      const result = await service.find(group);

      // Assert
      expect(result).toEqual(mockedCompanySelector);
      expect(repository.query).toHaveBeenCalledWith('company');
      expect(repository.query().select).toHaveBeenCalledWith('company.id', 'key');
      expect(repository.query().addSelect).toHaveBeenCalledWith('company.name', 'label');
      expect(repository.query().leftJoinAndSelect).toHaveBeenCalledWith('company.group', 'group', 'group.id = :groupId', { groupId: group });
      expect(repository.query().where).toHaveBeenCalledWith('group.status = :status', { status: true });
      expect(repository.query().getRawMany).toHaveBeenCalled();
    });
  });
});