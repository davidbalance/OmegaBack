import { Report } from "../report.domain";

describe('Report Entity', () => {

    let report: Report;

    beforeEach(() => {
        report = Report.create({ testId: 'Test1' });
    });

    it('should get the correct initial state', () => {
        expect(report.testId).toEqual('Test1');
        expect(report.content).toBeNull();
    });

    it('should add content to the report', () => {
        report.addContent('New content');
        expect(report.content).toEqual('New content');
    });

    it('should add file to the report', () => {
        report.addFile('/path/to/file.pdf');
        expect(report.filepath).toEqual('/path/to/file.pdf');
    });

    it('should remove content from the report', () => {
        report.addContent('New content');
        report.removeContent();
        expect(report.content).toBeNull();
    });

    it('should rehydrate', () => {
        const reportId = crypto.randomUUID();
        const rehydrated = Report.rehydrate({
            id: reportId,
            testId: 'Test1',
            content: '',
            filepath: null
        })
        expect(rehydrated.id).toEqual(reportId);
        expect(rehydrated.testId).toEqual('Test1');
        expect(rehydrated.content).toEqual('');
        expect(rehydrated.filepath).toBeNull();
    });
});