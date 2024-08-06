import { TestBed } from "@automock/jest";
import { ExamSubtypeExternalKeyRepository } from "../../repositories/exam-subtype-external-key.repository";
import { ExamSubtypeExternalKeyService } from "../exam-subtype-external-key.service";

describe('ExamSubtypeExternalKeyService', () => {
    let service: ExamSubtypeExternalKeyService;
    let repository: jest.Mocked<ExamSubtypeExternalKeyRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(ExamSubtypeExternalKeyService).compile();

        service = unit;
        repository = unitRef.get(ExamSubtypeExternalKeyRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
