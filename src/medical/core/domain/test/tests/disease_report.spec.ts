import { DiseaseReport } from "../disease_report.domain";

describe('DiseaseReport Entity', () => {

    let diseaseReport: DiseaseReport;

    beforeEach(() => {
        diseaseReport = DiseaseReport.create({
            testId: 'Test1',
            diseaseId: '123',
            diseaseName: 'Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Group A',
            commentary: 'Test commentary',
        });
    });

    it('should get the correct initial state', () => {
        expect(diseaseReport.testId).toEqual('Test1');
        expect(diseaseReport.diseaseId).toEqual('123');
        expect(diseaseReport.diseaseName).toEqual('Disease A');
        expect(diseaseReport.diseaseGroupId).toEqual('1');
        expect(diseaseReport.diseaseGroupName).toEqual('Group A');
        expect(diseaseReport.commentary).toEqual('Test commentary');
    });

    it('should rehydrate', () => {
        const diseaseReportId = crypto.randomUUID();
        const rehydrated = DiseaseReport.rehydrate({
            id: diseaseReportId,
            testId: 'Test1',
            diseaseId: '123',
            diseaseName: 'Disease A',
            diseaseGroupId: '1',
            diseaseGroupName: 'Group A',
            commentary: 'Test commentary',
        })
        expect(rehydrated.id).toEqual(diseaseReportId);
        expect(rehydrated.testId).toEqual('Test1');
        expect(rehydrated.diseaseId).toEqual('123');
        expect(rehydrated.diseaseName).toEqual('Disease A');
        expect(rehydrated.diseaseGroupId).toEqual('1');
        expect(rehydrated.diseaseGroupName).toEqual('Group A');
        expect(rehydrated.commentary).toEqual('Test commentary');
    });

    it('should update the commentary correctly', () => {
        diseaseReport.update({ commentary: 'Updated commentary' });
        expect(diseaseReport.commentary).toEqual('Updated commentary');
    });
});