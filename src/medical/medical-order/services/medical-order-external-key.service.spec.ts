import { TestBed } from "@automock/jest";
import { MedicalOrderExternalKeyRepository } from "../repositories/medical-order-external-key.repository";
import { MedicalOrderExternalKeyService } from "./medical-order-external-key.service";

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

  it('to be defined', () => {
    expect(service).toBeDefined();
  });
});