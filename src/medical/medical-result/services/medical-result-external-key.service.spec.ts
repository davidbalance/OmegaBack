import { TestBed } from "@automock/jest";
import { MedicalResultExternalKeyRepository } from "../repositories/medical-result-external-key.respository";
import { MedicalResultExternalKeyService } from "./medical-result-external-key.service";

describe('MedicalResultExternalKeyService', () => {
  let service: MedicalResultExternalKeyService;
  let repository: jest.Mocked<MedicalResultExternalKeyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(MedicalResultExternalKeyService).compile();

    service = unit;
    repository = unitRef.get(MedicalResultExternalKeyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('to be defined', () => {
    expect(service).toBeDefined();
  });
});