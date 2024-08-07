import { TestBed } from "@automock/jest";
import { BranchExternalKeyRepository } from "../../repositories/branch-external-key.repository";
import { BranchExternalKeyService } from "../branch-external-key.service";

describe('BranchExternalKeyService', () => {
    let service: BranchExternalKeyService;
    let repository: jest.Mocked<BranchExternalKeyRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(BranchExternalKeyService).compile();

        service = unit;
        repository = unitRef.get(BranchExternalKeyRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
