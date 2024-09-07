import { TestBed } from "@automock/jest";
import { JobPositionExternalKeyRepository } from "../repositories/job-position-external-key.repository";
import { JobPositionExternalKeyService } from "./job-position-external-key.service";

describe('JobPositionExternalKeyService', () => {
    let service: JobPositionExternalKeyService;
    let repository: jest.Mocked<JobPositionExternalKeyRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(JobPositionExternalKeyService).compile();

        service = unit;
        repository = unitRef.get(JobPositionExternalKeyRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
