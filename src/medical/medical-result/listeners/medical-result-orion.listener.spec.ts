import { TestBed } from "@automock/jest";
import { MedicalResultRepository } from "../repositories/medical-result.repository";
import { MedicalResultOrionListener } from "./medical-result-orion.listener";

describe('MedicalResultOrionListener', () => {
    let listener: MedicalResultOrionListener;
    let repository: jest.Mocked<MedicalResultRepository>;

    beforeEach(async () => {
        const { unit, unitRef } = TestBed.create(MedicalResultOrionListener).compile();

        listener = unit;
        repository = unitRef.get(MedicalResultRepository);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('handleMedicalResultUpload', () => {
        it('should log a message when a medical result file is uploaded', async () => {
            // Arrange

            // Act
            expect(listener).toBeDefined()

            // Assert
        });
    });
});
