import { DiseaseReportConflictError, DiseaseReportNotFoundError } from "../errors/disease_report.errors";
import { TestExternalKeyConflictError } from "../errors/test-external-key.errors";
import { AddTestExternalKeyPayload, CreateDiseaseReportPayload, CreateTestPayload, ExamPayload, UpdateDiseaseReportPayload } from "../payloads/test.payloads";
import { Report } from "../report.domain";
import { Result } from "../result.domain";
import { Test } from "../test.domain";
import { TestExternalKey } from "../value_objects/test-external-key.value-object";

describe('Test Aggregate', () => {

    let test: Test;

    beforeEach(() => {
        const payload: CreateTestPayload = {
            examName: 'Blood Test',
            examSubtype: 'Subtype1',
            examType: 'Type1',
            orderId: 'Order1'
        };
        test = Test.create(payload);
    });

    it('should create a Test aggregate correctly', () => {
        expect(test.orderId).toEqual('Order1');
        expect(test.exam.name).toEqual('Blood Test');
        expect(test.exam.subtype).toEqual('Subtype1');
        expect(test.exam.type).toEqual('Type1');
        expect(test.diseases).toHaveLength(0);
        expect(test.externalKeys).toHaveLength(0);
    });

    it('should rehydrate', () => {
        const testId = crypto.randomUUID();
        const rehydrated = Test.rehydrate({
            id: testId,
            orderId: "Order1",
            examName: 'Blood Test',
            examSubtype: 'Subtype1',
            examType: 'Type1',
            diseases: [],
            checklist: false,
            report: Report.create({ testId: testId }),
            result: Result.create({ testId: testId }),
            externalKeys: [TestExternalKey.create({ owner: 'app', testId: testId, value: 'key' })]
        });

        expect(rehydrated.id).toEqual(testId);
        expect(rehydrated.orderId).toEqual('Order1');
        expect(rehydrated.exam.name).toEqual('Blood Test');
        expect(rehydrated.exam.subtype).toEqual('Subtype1');
        expect(rehydrated.exam.type).toEqual('Type1');
        expect(rehydrated.diseases).toHaveLength(0);
        expect(rehydrated.externalKeys).toHaveLength(1);
    });

    it('should add a result to the Test aggregate', () => {
        const filepath = '/path/to/file.pdf';

        test.addResult(filepath);
        expect(test.result.filepath).toEqual(filepath);
    });

    it('should remove a result to the Test aggregate', () => {
        test.removeResult();
        expect(test.result.filepath).toEqual('');
        expect(test.result.hasFile).toBeFalsy()
    });

    it('should add a report to the Test aggregate', () => {
        test.addReport('My report content');
        expect(test.report?.content).toEqual('My report content');
        expect(test.report?.filepath).toBeNull();
    });

    it('should remove a report file to the Test aggregate', () => {
        test.addReportFile("/path/to/file.pdf");
        expect(test.report?.filepath).toEqual("/path/to/file.pdf");
    });

    it('should remove a report to the Test aggregate', () => {
        test.removeReport();
        expect(test.report?.content).toBeNull();
        expect(test.report?.filepath).toBeNull();
    });

    it('should check Test aggregate', () => {
        test.check();
        expect(test.checklist).toBeTruthy();
    });

    it('should uncheck Test aggregate', () => {
        test.uncheck();
        expect(test.checklist).toBeFalsy();
    });

    it('should change the exam Test aggregate', () => {
        const payload: ExamPayload = {
            examName: 'Skin Test',
            examSubtype: 'Subtype2',
            examType: 'Type2',
        }
        test.changeExam(payload);
        expect(test.exam.name).toEqual('Skin Test');
        expect(test.exam.subtype).toEqual('Subtype2');
        expect(test.exam.type).toEqual('Type2');
    });

    it('should add a disease to the Test aggregate', () => {
        const diseaseReport: CreateDiseaseReportPayload = {
            diseaseId: '123',
            diseaseName: 'Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Group A',
            commentary: 'Test commentary',
        };

        test.addDisease(diseaseReport);
        expect(test.diseases).toHaveLength(1);
        expect(test.diseases[0].diseaseName).toEqual('Disease A');
    });

    it('should throw an error when adding a duplicate disease to the Test aggregate', () => {
        const diseaseReport: CreateDiseaseReportPayload = {
            diseaseId: '123',
            diseaseName: 'Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Group A',
            commentary: 'Test commentary',
        };

        test.addDisease(diseaseReport);
        expect(() => test.addDisease(diseaseReport)).toThrow(DiseaseReportConflictError);
    });

    it('should update a disease in the Test aggregate', () => {
        const diseaseReport: CreateDiseaseReportPayload = {
            diseaseId: '123',
            diseaseName: 'Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Group A',
            commentary: 'Test commentary',
        };

        test.addDisease(diseaseReport);

        const updatedDisease: UpdateDiseaseReportPayload = {
            id: test.diseases[0].id,
            diseaseId: '456',
            diseaseName: 'Updated Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Updated Group A',
            commentary: 'Updated commentary',
        };

        test.updateDisease(updatedDisease);
        expect(test.diseases[0].diseaseName).toEqual('Updated Disease A');
    });

    it('should throw an error when updating a non-existent disease', () => {
        const updatedDisease: UpdateDiseaseReportPayload = {
            id: 'non-existent-id',
            diseaseId: '123',
            diseaseName: 'Updated Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Updated Group A',
            commentary: 'Updated commentary',
        };

        expect(() => test.updateDisease(updatedDisease)).toThrow(DiseaseReportNotFoundError);
    });

    it('should remove a disease from the Test aggregate', () => {
        const diseaseReport: CreateDiseaseReportPayload = {
            diseaseId: '123',
            diseaseName: 'Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Group A',
            commentary: 'Test commentary',
        };

        test.addDisease(diseaseReport);
        test.removeDisease(test.diseases[0].id);
        expect(test.diseases).toHaveLength(0);
    });

    it('should throw an error when removing a non-existent disease', () => {
        expect(() => test.removeDisease('non-existent-id')).toThrow(DiseaseReportNotFoundError);
    });

    it('should add an external key property', () => {
        const payload: AddTestExternalKeyPayload = { owner: 'omega', value: 'sample-key' }

        test.addKey(payload);

        expect(test.externalKeys).toHaveLength(1);
        expect(test.externalKeys[0].owner).toBe(payload.owner);
        expect(test.externalKeys[0].value).toBe(payload.value);
    });

    it('should throw a conflict error when add a repeated key', () => {
        const payload: AddTestExternalKeyPayload = { owner: 'omega', value: 'sample-key' }
        test.addKey(payload);

        expect(() => test.addKey(payload)).toThrow(TestExternalKeyConflictError);
    });
});
