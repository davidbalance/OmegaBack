import { Model } from "@shared/shared/domain/model";

export type TestModelProps = {
    testId: string;
    testCheck: boolean;
    resultHasFile: boolean;
    reportHasContent: boolean;
    orderId: string;
    examName: string;
    examSubtype: string;
    examType: string;
    diseases: string;
}

export class TestModel extends Model<TestModelProps> {

    public get testId(): Readonly<string> {
        return this.props.testId;
    }

    public get testCheck(): Readonly<boolean> {
        return this.props.testCheck;
    }

    public get resultHasFile(): Readonly<boolean> {
        return this.props.resultHasFile;
    }

    public get reportHasContent(): Readonly<boolean> {
        return this.props.reportHasContent;
    }

    public get orderId(): Readonly<string> {
        return this.props.orderId;
    }

    public get examType(): Readonly<string> {
        return this.props.examType;
    }

    public get examSubtype(): Readonly<string> {
        return this.props.examSubtype;
    }

    public get examName(): Readonly<string> {
        return this.props.examName;
    }

    public get diseases(): ReadonlyArray<string> {
        return this.props.diseases.split('|');
    }
}