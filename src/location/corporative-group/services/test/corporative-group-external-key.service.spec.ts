import { TestBed } from "@automock/jest";
import { CorporativeGroupExternalKeyRepository } from "../../repositories/corporative-group-external-key.repository";
import { CorporativeGroupExternalKeyService } from "../corporative-group-external-key.service";

describe('CorporativeGroupExternalKeyService', () => {
    let service: CorporativeGroupExternalKeyService;
    let repository: jest.Mocked<CorporativeGroupExternalKeyRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(CorporativeGroupExternalKeyService).compile();

        service = unit;
        repository = unitRef.get(CorporativeGroupExternalKeyRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

});
