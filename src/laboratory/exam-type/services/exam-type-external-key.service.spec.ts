import { TestBed } from "@automock/jest";
import { ExamTypeExternalKeyService } from "./exam-type-external-key.service";
import { ExamTypeExternalKeyRepository } from "../repositories/exam-type-external-key.repository";

describe('ExamTypeExternalKeyService', () => {
  let service: ExamTypeExternalKeyService;
  let repository: jest.Mocked<ExamTypeExternalKeyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamTypeExternalKeyService).compile();

    service = unit;
    repository = unitRef.get(ExamTypeExternalKeyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});