import { TestBed } from "@automock/jest";
import { BranchManagementService } from "../branch-management.service";
import { BranchRepository } from "../../repositories/branch.repository";
import { mockBranches } from "./stub/branch.stub";

describe('BranchManagementService', () => {
  let service: BranchManagementService;
  let repository: jest.Mocked<BranchRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(BranchManagementService).compile();

    service = unit;
    repository = unitRef.get(BranchRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('find', () => {
    const company: number = 1;
    const mockedBranches = mockBranches();

    it('should return branches', async () => {
      repository.find.mockResolvedValueOnce(mockedBranches);
      const result = await service.find(company);

      expect(result).toEqual(mockedBranches);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          company: { id: company },
          status: true,
        },
        select: {
          id: true,
          name: true,
          city: { name: true },
          company: {
            corporativeGroup: { name: true },
            address: true,
            name: true,
            ruc: true,
            phone: true
          },
        }
      });
    });
  });

  describe('findByCompanyRuc', () => {
    const ruc: string = "1234567890";
    const mockedBranches = mockBranches();

    it('should return branches by ruc', async () => {
      repository.find.mockResolvedValueOnce(mockedBranches);

      const result = await service.findByCompanyRuc(ruc);

      expect(result).toEqual(mockedBranches);
      expect(repository.find).toHaveBeenCalledWith({
        where: {
          company: { ruc: ruc },
          status: true,
        },
        select: {
          id: true,
          name: true,
          city: { name: true },
          company: {
            corporativeGroup: { name: true },
            address: true,
            name: true,
            ruc: true,
            phone: true
          },
        }
      });
    });
  });
});