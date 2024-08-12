import { TestBed } from "@automock/jest";
import { MedicalResultSendAttributeRepository } from "../../repositories/medical-result-send-attribute.repository";
import { MedicalResultSendAttributeService } from "../medical-result-send-attribute.service";

describe('MedicalResultSendAttributeService', () => {
    let service: MedicalResultSendAttributeService;
    let repository: jest.Mocked<MedicalResultSendAttributeRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultSendAttributeService).compile();

        service = unit;
        repository = unitRef.get(MedicalResultSendAttributeRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

});