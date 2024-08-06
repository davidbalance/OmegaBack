import { TestBed } from "@automock/jest";
import { ExamExternalKeyService } from "../exam-external-key.service";
import { ExamExternalKeyRepository } from "../../repositories/exam-external-key.repository";

describe('ExamExternalKeyService', () => {
  let service: ExamExternalKeyService;
  let repository: jest.Mocked<ExamExternalKeyRepository>;

  beforeEach(async () => {
    const { unit, unitRef } = TestBed.create(ExamExternalKeyService).compile();

    service = unit;
    repository = unitRef.get(ExamExternalKeyRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});