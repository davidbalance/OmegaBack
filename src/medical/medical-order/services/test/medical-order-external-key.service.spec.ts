import { TestBed } from "@automock/jest";
import { MedicalOrderExternalKeyService } from "../medical-order-external-key.service";
import { MedicalOrderExternalKeyRepository } from "../../repositories/medical-order-external-key.repository";

describe('MedicalOrderExternalKeyService', () => {
  let service: MedicalOrderExternalKeyService;
  let repository: jest.Mocked<MedicalOrderExternalKeyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalOrderExternalKeyService).compile();

    service = unit;
    repository = unitRef.get(MedicalOrderExternalKeyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should defined', () => {
    expect(service).toBeDefined();
  })
});