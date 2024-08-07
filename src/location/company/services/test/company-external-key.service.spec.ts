import { TestBed } from "@automock/jest";
import { CompanyExternalKeyService } from '../company-external-key.service'
import { CompanyExternalKeyRepository } from '../../repositories/company-external-key.repository'

describe('CompanyExternalKeyService', () => {
  let service: CompanyExternalKeyService;
  let repository: jest.Mocked<CompanyExternalKeyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(CompanyExternalKeyService).compile();

    service = unit;
    repository = unitRef.get(CompanyExternalKeyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('to be defined', () => {
    expect(service).toBeDefined();
  });
});