import { Result } from "./result.domain";
import { DiseaseReport } from "./disease-report.domain";
import { Report } from "./report.domain";
import { ExamValueObject } from "./value-objects/exam.value-object";
import { ResultCreatedEvent, ResultFileAddedEvent, ResultFileRemovedEvent } from "./events/result.events";
import { ReportAddedContentEvent, ReportAddedFilepathEvent, ReportCreatedEvent, ReportRemovedContentEvent } from "./events/report.events";
import { TestCheckedEvent, TestDiseaseAddedEvent, TestDiseaseRemovedEvent, TestExamChangedEvent, TestExternalKeyAddedEvent, TestReactivatedEvent, TestRemovedEvent, TestUncheckedEvent } from "./events/test.events";
import { AddTestExternalKeyPayload, CreateDiseaseReportPayload, CreateTestPayload, ExamPayload, UpdateDiseaseReportPayload } from "./payloads/test.payloads";
import { DiseaseReportUpdatedEvent } from "./events/disease.events";
import { AggregateProps, Aggregate } from "@shared/shared/domain";
import { DiseaseReportConflictError, DiseaseReportNotFoundError } from "./errors/disease-report.errors";
import { TestExternalKey } from "./value-objects/test-external-key.value-object";
import { ExternalKeyProps } from "@shared/shared/domain/external-key.value-object";
import { TestExternalKeyConflictError } from "./errors/test-external-key.errors";

export type TestProps = AggregateProps & {
    orderId: string;
    exam: ExamValueObject;
    result: Result;
    report: Report;
    diseases: DiseaseReport[];
    checklist: boolean;
    externalKeys: TestExternalKey[];
};
export type RehydrateDiseaseReportPayload = CreateTestPayload & {
    id: string;
    diseases: DiseaseReport[];
    checklist: boolean;
    result: Result;
    report: Report;
    externalKeys: TestExternalKey[];
};
export class Test extends Aggregate<TestProps> {

    public get result(): Readonly<Result> {
        return this.props.result;
    }

    public get report(): Readonly<Report> {
        return this.props.report;
    }

    public get diseases(): ReadonlyArray<DiseaseReport> {
        return this.props.diseases;
    }

    public get orderId(): Readonly<string> {
        return this.props.orderId;
    }

    public get exam(): Readonly<ExamValueObject> {
        return this.props.exam;
    }

    public get checklist(): Readonly<boolean> {
        return this.props.checklist;
    }

    public get externalKeys(): ReadonlyArray<TestExternalKey> {
        return this.props.externalKeys;
    }

    private ensureUniqueExternalKey(key: ExternalKeyProps): void {
        if (this.props.externalKeys.some(e => e.owner === key.owner && e.value === key.value)) throw new TestExternalKeyConflictError(key.owner, key.value);
    }

    public static create(value: CreateTestPayload): Test {

        const testId: string = crypto.randomUUID();
        const exam = ExamValueObject.create({
            name: value.examName,
            subtype: value.examSubtype,
            type: value.examType
        });

        const newResult = Result.create({ testId: testId });
        const newReport = Report.create({ testId: testId });

        const test = new Test({
            id: testId,
            exam: exam,
            result: newResult,
            report: newReport,
            diseases: [],
            checklist: false,
            externalKeys: [],
            ...value
        });

        test.emit(new ResultCreatedEvent(newResult));
        test.emit(new ReportCreatedEvent(newReport));

        return test;
    }

    public static rehydrate(value: RehydrateDiseaseReportPayload): Test {
        const exam = ExamValueObject.create({
            name: value.examName,
            subtype: value.examSubtype,
            type: value.examType,
        });

        const test = new Test({ ...value, exam });
        test.commit();
        return test;
    }

    public remove(): void {
        this.emit(new TestRemovedEvent(this.id));
    }

    public reactivate(): void {
        this.emit(new TestReactivatedEvent(this.id));
        this.check();
        for (const disease of this.diseases) {
            this.removeDisease(disease.id);
        }
        this.removeResult();
        this.removeReport();
    }

    public addResult(filepath: string): void {
        const result = this.props.result;
        result.addFile(filepath);
        this.updateProps({ result });
        this.emit(new ResultFileAddedEvent({ resultId: result.id, filepath }));
    }

    public removeResult(): void {
        const result = this.props.result;
        result.removeFile();
        this.updateProps({ result });
        this.emit(new ResultFileRemovedEvent(result.id));
    }

    public addReport(content: string): void {
        const report = this.props.report;
        report.addContent(content);
        this.updateProps({ report });
        this.emit(new ReportAddedContentEvent({ reportId: report.id, content }));
    }

    public addReportFile(filepath: string): void {
        const report = this.props.report;
        report.addFile(filepath);
        this.updateProps({ report });
        this.emit(new ReportAddedFilepathEvent({ reportId: report.id, filepath }));
    }

    public removeReport(): void {
        const report = this.props.report;
        report.removeContent();
        this.updateProps({ report });
        this.emit(new ReportRemovedContentEvent(report.id));
    }

    public check(): void {
        this.updateProps({ checklist: true });
        this.emit(new TestCheckedEvent(this.id));
    }

    public uncheck(): void {
        this.updateProps({ checklist: false });
        this.emit(new TestUncheckedEvent(this.id));
    }

    public changeExam(value: ExamPayload): void {
        const exam = ExamValueObject.create({
            name: value.examName,
            subtype: value.examSubtype,
            type: value.examType
        });
        this.updateProps({ exam });
        this.emit(new TestExamChangedEvent({ testId: this.id, ...value }))
    }

    public addDisease(value: CreateDiseaseReportPayload): void {
        if (this.diseases.find(x => x.diseaseId === value.diseaseId && x.diseaseGroupId === value.diseaseGroupId)) {
            throw new DiseaseReportConflictError(this.id, value.diseaseName);
        }
        const disease = DiseaseReport.create({ testId: this.id, ...value });
        this.updateProps({ diseases: [...this.props.diseases, disease] });
        this.emit(new TestDiseaseAddedEvent(disease));
    }

    public updateDisease(value: UpdateDiseaseReportPayload): void {
        if (this.diseases.find(x => x.id !== value.id && x.diseaseId === value.diseaseId && x.diseaseGroupId === value.diseaseGroupId)) {
            throw new DiseaseReportConflictError(this.id, value.diseaseName);
        }

        const disease = this.props.diseases.find(x => x.id === value.id);
        if (!disease) {
            throw new DiseaseReportNotFoundError(value.id);
        }

        disease.update(value);
        const newDiseases = this.props.diseases.map(x => x.id === value.id ? disease : x);
        this.updateProps({ diseases: newDiseases })

        this.emit(new DiseaseReportUpdatedEvent(disease));
    }

    public removeDisease(diseaseId: string): void {
        const diseases = this.diseases.filter(x => x.id !== diseaseId)
        if (diseases.length === this.diseases.length) throw new DiseaseReportNotFoundError(diseaseId);

        this.updateProps({ diseases: [...diseases] });

        this.emit(new TestDiseaseRemovedEvent(diseaseId));
    }

    public addExternalKey(payload: AddTestExternalKeyPayload): void {
        this.ensureUniqueExternalKey(payload);
        const newKey = TestExternalKey.create({ ...payload, testId: this.id });
        const newExternalKeys = [...this.props.externalKeys, newKey];
        this.updateProps({ externalKeys: newExternalKeys });
        this.emit(new TestExternalKeyAddedEvent(newKey));
    }
}