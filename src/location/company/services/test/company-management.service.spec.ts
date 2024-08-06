import { TestBed } from "@automock/jest";
import { CompanyRepository } from "../../repositories/company.repository";
import { CompanyManagementService } from "../company-management.service";
import { mockCompanies, mockCompany } from "./stub/company.stub";

describe('CompanyManagementService', () => {
  let service: CompanyManagementService;
  let repository: jest.Mocked<CompanyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CompanyManagementService).compile();

    service = unit;
    repository = unitRef.get(CompanyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const group: number = 1;
    const mockedCompanies = mockCompanies();

    it('should return corporative groups', async () => {
      // Arrange
      repository.find.mockResolvedValueOnce(mockedCompanies);

      // Act
      const result = await service.find(group);

      // Assert
      expect(result).toEqual(mockedCompanies);
      expect(repository.find).toHaveBeenCalledWith({
        select: {
          id: true,
          name: true,
          phone: true,
          ruc: true,
          address: true,
          corporativeGroup: { name: true }
        },
        where: {
          corporativeGroup: { id: group },
          status: true
        }
      });
    });
  });

  describe('findOne', () => {
    const id: number = 1;
    const mockedCompany = mockCompany();

    it('should return corporative groups', async () => {
      // Arrange
      repository.findOne.mockResolvedValueOnce(mockedCompany);

      // Act
      const result = await service.findOne(id);

      // Assert
      expect(result).toEqual(mockedCompany);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id } });
    });
  });
});